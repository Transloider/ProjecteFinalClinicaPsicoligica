import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import CalendarForm from '../components/calendar/CalendarForm';
import { getClients } from '../data/clients.server';
import { getUserForSession, getUserID } from '../data/auth.server';
import { redirect, useActionData, useLoaderData } from '@remix-run/react';
import { Client, Event } from "../types/interfaces";
import { addEvent } from "../data/calendar.server";
import { eventValidator } from "~/utils/validators";

// Funció per carregar dades inicials (clients) des del servidor
export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Obtenim el token de l'usuari des de la sessió
    const token = await getUserForSession(request);
    // Recuperem la llista de clients associats a l'usuari
    const clients: Client[] = await getClients(token as string);
    return { clients };
  } catch (error) {
    // Registrem l'error al servidor per a depuració
    console.log(error);
  }
};

// Funció per gestionar l'acció del formulari
export async function action({ request }: ActionFunctionArgs) {
  try {
    // Obtenim les dades enviades pel formulari
    const formData = await request.formData();
    const date = formData.get('date') as string;
    const clientID = formData.get('client') as string;
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const userID = await getUserID(request) as string;

    // Creem un objecte amb les dades de l'esdeveniment
    const event: Event = {
      title: title,
      clientID: clientID,
      userID: userID,
      description: summary,
      event_date: date,
    };

    // Validem les dades de l'esdeveniment
    const { valid, errors } = eventValidator(event);
    if (!valid) {
      // Retornem els errors si la validació falla
      return { errors };
    }

    // Afegim l'esdeveniment a la base de dades
    await addEvent(request, event);
    // Redirigim l'usuari al calendari
    return redirect('/calendar');
  } catch (error) {
    // Llancem un error si alguna cosa falla durant el procés
    throw new Error('Error getting events');
  }
}

// Component principal que es mostra a la pàgina
export default function Index() {
  // Carreguem la llista de clients des de la funció loader
  const { clients } = useLoaderData<{ clients: Client[] }>();
  // Recuperem els errors d'acció si n'hi ha
  const actionData = useActionData<{ errors?: Record<string, string> }>();
  return (
    <div className='mt-4 text-black'>
        {/* Renderitzem el formulari del calendari amb els clients i els errors */}
        <CalendarForm clients={clients} error={actionData} />
    </div>
  );
}
