import nodemailer from 'nodemailer';

export interface AppointmentData {
  id: string;
  service: string;
  format: 'online' | 'in_person';
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  name: string;
  phone: string;
  email: string;
  company?: string;
  notes?: string;
  createdAt: string;
}

/**
 * 1-Tıkla Google Calendar Etkinliği Oluşturma URL'si
 * Hem randevuyu alan danışan hem de info@rotayd.com ve rotaydmm@gmail.com davetli olarak eklenir.
 */
export function generateGoogleCalendarUrl(appointment: AppointmentData): string {
  const { service, format, date, timeSlot, name, phone, email, company, notes } = appointment;

  // Başlangıç ve bitiş zamanı (1 saatlik randevu süresi)
  const cleanDate = date.replace(/-/g, '');
  const [startHour, startMin] = timeSlot.split(':').map(Number);
  const startHourStr = String(startHour).padStart(2, '0');
  const startMinStr = String(startMin || 0).padStart(2, '0');

  const endHour = startHour + 1;
  const endHourStr = String(endHour).padStart(2, '0');
  const endMinStr = startMinStr;

  const datesParam = `${cleanDate}T${startHourStr}${startMinStr}00/${cleanDate}T${endHourStr}${endMinStr}00`;

  const title = `ROTAYD Randevu: ${name} - ${service}`;
  const location =
    format === 'online'
      ? 'Online Görüşme (Google Meet / Zoom)'
      : 'ROTAYD Mali Müşavirlik & Yönetim Danışmanlığı Ofisi, Ankara';

  const details = [
    `ROTAYD DANIŞMANLIK RANDEVUSU`,
    `--------------------------------------`,
    `Danışan: ${name}`,
    `Telefon: ${phone}`,
    `E-Posta: ${email || 'Belirtilmedi'}`,
    `Şirket / Unvan: ${company || 'Belirtilmedi'}`,
    `Hizmet Konusu: ${service}`,
    `Görüşme Formatı: ${format === 'online' ? 'Online Toplantı (Google Meet)' : 'Yüz Yüze Görüşme (ROTAYD Ofis)'}`,
    `Tarih & Saat: ${date} ${timeSlot}`,
    notes ? `Danışan Notu: ${notes}` : '',
    `--------------------------------------`,
    `Bildirim Alıcıları: info@rotayd.com, rotaydmm@gmail.com`
  ]
    .filter(Boolean)
    .join('\n');

  // Davetliler: info@rotayd.com, rotaydmm@gmail.com ve danışan
  const attendees = ['info@rotayd.com', 'rotaydmm@gmail.com'];
  if (email && email.includes('@')) {
    attendees.push(email.trim());
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: datesParam,
    details: details,
    location: location,
    ctz: 'Europe/Istanbul',
    add: attendees.join(',')
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * iCalendar (.ics) Dosya Formatı (Google Calendar, Outlook, Apple Calendar)
 */
export function generateIcsContent(appointment: AppointmentData): string {
  const { id, service, format, date, timeSlot, name, phone, email, company, notes } = appointment;
  const cleanDate = date.replace(/-/g, '');
  const [startHour, startMin] = timeSlot.split(':').map(Number);
  const startHourStr = String(startHour).padStart(2, '0');
  const startMinStr = String(startMin || 0).padStart(2, '0');

  const endHour = startHour + 1;
  const endHourStr = String(endHour).padStart(2, '0');
  const endMinStr = startMinStr;

  const dtStart = `${cleanDate}T${startHourStr}${startMinStr}00`;
  const dtEnd = `${cleanDate}T${endHourStr}${endMinStr}00`;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const location =
    format === 'online'
      ? 'Online Görüşme (Google Meet)'
      : 'ROTAYD Mali Müşavirlik & Yönetim Danışmanlığı Ofisi, Ankara';

  const description = `Danisan: ${name}\\nTelefon: ${phone}\\nE-Posta: ${email}\\nSirket: ${company || '-'}\\nHizmet: ${service}\\nFormat: ${format}\\nNot: ${notes || '-'}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ROTAYD Danismanlik//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:rotayd-${id}@rotayd.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:ROTAYD Randevu: ${name} (${service})`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'ORGANIZER;CN=ROTAYD Danismanlik:mailto:rotaydmm@gmail.com',
    'ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=ROTAYD:mailto:info@rotayd.com',
    'ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=ROTAYD Takvim:mailto:rotaydmm@gmail.com',
    email ? `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${name}:mailto:${email}` : '',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:ROTAYD Randevu Hatırlatması (30 dk kala)',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ]
    .filter(Boolean)
    .join('\r\n');
}

/**
 * Google Calendar & info@rotayd.com E-Posta Bildirimi Gönderici
 */
export async function sendAppointmentNotification(
  appointment: AppointmentData
): Promise<{ success: boolean; message: string }> {
  const gCalendarUrl = generateGoogleCalendarUrl(appointment);
  const icsData = generateIcsContent(appointment);

  const smtpUser = process.env.GOOGLE_CALENDAR_EMAIL || 'rotaydmm@gmail.com';
  const smtpPass = process.env.GOOGLE_CALENDAR_PASSWORD || 'Alideniz2020';
  const notificationTarget = process.env.NOTIFICATION_EMAIL || 'info@rotayd.com';

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const mailOptions = {
    from: `"ROTAYD Randevu Sistemi" <${smtpUser}>`,
    to: notificationTarget,
    cc: smtpUser,
    replyTo: appointment.email || undefined,
    subject: `🗓️ Yeni Randevu Talebi: ${appointment.name} - ${appointment.service} (${appointment.date} ${appointment.timeSlot})`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040a1a; color: #ffffff; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #07173e; border: 1px solid #d4af37; border-radius: 16px; padding: 30px; }
          .header { text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 25px; }
          .header h1 { color: #d4af37; font-size: 22px; margin: 0; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(212,175,55,0.15); color: #faecc0; border: 1px solid rgba(212,175,55,0.3); border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 8px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          .info-table td { padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; }
          .info-table td.label { color: #94a3b8; font-weight: 600; width: 35%; }
          .info-table td.val { color: #ffffff; font-weight: 500; }
          .btn-container { text-align: center; margin: 25px 0 15px; }
          .btn-calendar { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; border-radius: 10px; box-shadow: 0 4px 15px rgba(16,185,129,0.3); }
          .footer { text-align: center; font-size: 11px; color: #64748b; margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ROTAYD • Yeni Randevu Bildirimi</h1>
            <span class="badge">Google Calendar Entegrasyonu</span>
          </div>

          <table class="info-table">
            <tr>
              <td class="label">Danışan Adı Soyadı:</td>
              <td class="val" style="color: #faecc0; font-weight: bold; font-size: 15px;">${appointment.name}</td>
            </tr>
            <tr>
              <td class="label">Telefon Numarası:</td>
              <td class="val"><a href="tel:${appointment.phone}" style="color: #38bdf8; text-decoration: none;">${appointment.phone}</a></td>
            </tr>
            <tr>
              <td class="label">E-Posta Adresi:</td>
              <td class="val"><a href="mailto:${appointment.email}" style="color: #38bdf8; text-decoration: none;">${appointment.email || 'Belirtilmedi'}</a></td>
            </tr>
            <tr>
              <td class="label">Şirket / Unvan:</td>
              <td class="val">${appointment.company || 'Belirtilmedi'}</td>
            </tr>
            <tr>
              <td class="label">Hizmet Konusu:</td>
              <td class="val" style="color: #faecc0;">${appointment.service}</td>
            </tr>
            <tr>
              <td class="label">Görüşme Formatı:</td>
              <td class="val">${appointment.format === 'online' ? '📹 Online Toplantı (Google Meet / Zoom)' : '🏢 Yüz Yüze Görüşme (ROTAYD Ofis)'}</td>
            </tr>
            <tr>
              <td class="label">Randevu Tarih & Saat:</td>
              <td class="val" style="font-weight: bold; font-size: 14px; color: #10b981;">${appointment.date} • Saat ${appointment.timeSlot}</td>
            </tr>
            ${appointment.notes ? `
            <tr>
              <td class="label">Danışan Notu:</td>
              <td class="val" style="font-style: italic; color: #cbd5e1;">"${appointment.notes}"</td>
            </tr>` : ''}
          </table>

          <div class="btn-container">
            <a href="${gCalendarUrl}" target="_blank" class="btn-calendar">
              📅 Randevuyu Google Calendar'a Kaydet
            </a>
          </div>

          <div class="footer">
            Bu e-posta ROTAYD web sitesi randevu formu üzerinden otomatik olarak oluşturulmuştur.<br>
            Bildirim Alıcıları: ${notificationTarget} • ${smtpUser}
          </div>
        </div>
      </body>
      </html>
    `,
    icalEvent: {
      filename: 'rotayd-randevu.ics',
      method: 'REQUEST',
      content: icsData
    }
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Google Calendar ve e-posta bildirimi başarıyla iletildi.' };
  } catch (err: any) {
    console.warn('Google SMTP bildirimi gönderilirken uyarı:', err.message);
    return {
      success: false,
      message: `SMTP uyarısı: ${err.message || 'Gönderilemedi'}`
    };
  }
}
