import { AppointmentsStore } from '@/lib/appointments-store';
import { generateFullCalendarFeed } from '@/lib/calendar-mailer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allAppointments = AppointmentsStore.getAppointments();
    // Yalnızca iptal edilmemiş randevuları takvim beslemesine ekle
    const activeAppointments = allAppointments.filter((a) => a.status !== 'iptal');
    const icsFeed = generateFullCalendarFeed(activeAppointments);

    return new Response(icsFeed, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'inline; filename="rotayd-randevulari.ics"',
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        'Pragma': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  } catch (err: any) {
    console.error('Takvim ICS beslemesi oluşturma hatası:', err);
    return new Response('BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//ROTAYD Danismanlik//TR\r\nEND:VCALENDAR', {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
