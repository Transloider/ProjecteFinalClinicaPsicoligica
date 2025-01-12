import { getEvents } from '../data/calendar.server';
import MyCalendar from '../components/calendar/Calendar';
import { ActionFunctionArgs } from "@remix-run/node";
import { Outlet, useActionData } from '@remix-run/react';
import CalendarEvents from '~/components/calendar/CalendarEvents';
import { Event } from '../types/interfaces';

// Recupera els esdeveniments per a una data específica
export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const date = formData.get('date') as string;
    const events: Event[] = await getEvents(request, date);
    return { events: events || [] };
  } catch (error) {
    throw new Error('Error getting events');
  }
}

// Renderitza el calendari i mostra els esdeveniments si n'hi ha
export default function Index() {
  const actionData = useActionData<{ events: Event[] }>();
  const events = actionData?.events || null;

  return (
    <div className='mt-[5rem] text-black'>
        <MyCalendar />
        <Outlet />
        <div className='mt-4'>
          {events !== null ? <CalendarEvents events={events} /> : ""}
        </div>
    </div>
  );
}
