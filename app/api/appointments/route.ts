import { NextResponse } from 'next/server';
import { AppointmentsStore } from '@/lib/appointments-store';
import { sendAppointmentNotification, generateIcsContent } from '@/lib/calendar-mailer';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateQuery = searchParams.get('date');

    if (dateQuery) {
      const bookedSlots = AppointmentsStore.getBookedSlotsForDate(dateQuery);
      return NextResponse.json({
        success: true,
        date: dateQuery,
        bookedSlots
      });
    }

    const appointments = AppointmentsStore.getAppointments();
    return NextResponse.json({ success: true, appointments });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Randevular alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, format, date, timeSlot, name, phone, email, company, notes } = body;

    if (!name || !phone || !date || !timeSlot || !service) {
      return NextResponse.json(
        { success: false, error: 'Lütfen zorunlu alanları (Ad, Telefon, Tarih, Saat, Hizmet) doldurunuz.' },
        { status: 400 }
      );
    }

    // SLOT DOLULUK KONTROLÜ: Seçilen tarih ve saatte aktif randevu var mı?
    const currentBookedSlots = AppointmentsStore.getBookedSlotsForDate(date);
    if (currentBookedSlots.includes(timeSlot)) {
      return NextResponse.json(
        {
          success: false,
          error: `Seçilen ${date} tarihindeki saat ${timeSlot} slotu daha önce doldurulmuştur. Lütfen başka bir saat seçiniz.`,
          isSlotBooked: true,
          bookedSlots: currentBookedSlots
        },
        { status: 409 }
      );
    }

    // Randevuyu kalıcı veritabanına kaydet (slot anında dolar)
    const appointment = AppointmentsStore.addAppointment({
      service,
      format: format || 'online',
      date,
      timeSlot,
      name,
      phone,
      email: email || '',
      company: company || '',
      notes: notes || ''
    });

    // Google Calendar & info@rotayd.com bildirimi gönder
    let notificationResult = { success: false, message: '' };
    try {
      notificationResult = await sendAppointmentNotification(appointment);
      if (notificationResult.success) {
        AppointmentsStore.updateStatus(appointment.id, 'beklemede');
      }
    } catch (e: any) {
      console.warn('E-posta bildirimi arka planda işlenirken uyarı:', e?.message);
    }

    const icsContent = generateIcsContent(appointment);

    return NextResponse.json({
      success: true,
      appointment,
      googleCalendarUrl: appointment.googleCalendarUrl,
      icsContent,
      notificationSent: notificationResult.success,
      notificationMessage: notificationResult.message
    });
  } catch (err: any) {
    console.error('Randevu oluşturma hatası:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Randevu oluşturulamadı' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Eksik parametre' }, { status: 400 });
    }

    const updated = AppointmentsStore.updateStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Randevu bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID gereklidir' }, { status: 400 });
    }

    const deleted = AppointmentsStore.deleteAppointment(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Randevu bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
