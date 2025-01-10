import { getEvents } from '../data/calendar.server';
import { ActionFunctionArgs } from "@remix-run/node";
import CalendarForm from '~/components/calendar/CalendarForm';
export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        const date = formData.get('date') as string;
        const events = await getEvents(request, '10', date);
        console.log(events);
        return {events};
    } catch (error) {
        throw new Error('Error getting events');
    }
}
export default function Index() {

  return (
    <div className='mt-[5rem] text-black'>
        
    </div>
  );
}
