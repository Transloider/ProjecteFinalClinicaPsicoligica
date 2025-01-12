import { getEvents } from '../data/calendar.server';
import { ActionFunctionArgs } from "@remix-run/node";

// Funció per gestionar l'acció del formulari
export async function action({ request }: ActionFunctionArgs) {
  try {
    // Obtenim les dades enviades pel formulari
    const formData = await request.formData();
    const date = formData.get('date') as string;

    // Recuperem els esdeveniments corresponents a la data especificada
    const events = await getEvents(request, date);
    return { events };
  } catch (error) {
    // Llancem un error si es produeix algun problema durant la recuperació
    throw new Error('Error getting events');
  }
}

// Component principal que es mostra a la pàgina
export default function Index() {
  return (
    <div className='mt-[5rem] text-black'>
        {/* Contingut principal de la pàgina (actualment buit) */}
    </div>
  );
}
