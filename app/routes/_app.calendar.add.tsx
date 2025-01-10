import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import CalendarForm from '../components/calendar/CalendarForm';
import { getClients } from '../data/clients.server';
import { getUserForSession, getUserID } from '../data/auth.server';
import { redirect, useActionData, useLoaderData } from '@remix-run/react';
import { Client, Event } from "../types/interfaces";
import { addEvent } from "../data/calendar.server";
import { eventValidator } from "~/utils/validators";
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const token = await getUserForSession(request);
    const clients: Client[] = await getClients(token as string);
    return {clients};
  } catch (error) {
    console.log(error);
  }
};
export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        const date = formData.get('date') as string;
        const clientID = formData.get('client') as string;
        const title = formData.get('title') as string;
        const summary = formData.get('summary') as string;
        const userID = await getUserID(request) as string;

        const event: Event = {
          title: title,
          clientID: clientID,
          userID: userID,
          description: summary,
          event_date: date,
        }
        
        const {valid, errors} = eventValidator(event);
        if (!valid) {
            return {errors}
        }
        await addEvent(request,event);
        return redirect('/calendar');
    } catch (error) {
        throw new Error('Error getting events');
    }
}
export default function Index() {
  const {clients} = useLoaderData<{clients: Client[]}>();
  const actionData = useActionData<{ errors?: Record<string, string> }>();
  return (
    <div className='mt-4 text-black'>
        <CalendarForm clients={clients} error={actionData}/>
    </div>
  );
}
