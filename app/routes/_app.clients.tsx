import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useLocation } from '@remix-run/react';
import { getClients } from '../data/clients.server';
import { requireUserSession } from '../data/auth.server';
import { Client } from '../types/interfaces';

// Loader per obtenir dades dels clients associats a un usuari
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Obtenim l'ID de l'usuari a partir de la sessió requerida
    const user_id = await requireUserSession(request);
    // Recuperem la llista de clients de l'usuari
    const clients = await getClients(user_id);
    return {clients};
  } catch (error) {
    // En cas d'error, retornem una resposta amb un estat de servidor (500)
    throw new Response('Error loading clients', { status: 500 });
  }
}

// Component principal per a la gestió de clients
const Clients = () => {
  // Carreguem les dades dels clients des del loader
  const {clients} = useLoaderData<{clients: Client[]}>();
  // Obtenim la ubicació actual per accedir als paràmetres de la URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Missatge opcional de confirmació d'èxit (si existeix)
  const successMessage = queryParams.get("message");
  
  return (
    <>
      {/* Contenidor principal amb separació superior */}
      <div className='mt-[4rem]'>
        {/* Renderitzem l'Outlet amb el context dels clients i el missatge d'èxit */}
        <Outlet context={{ clients, successMessage }}/>
      </div>
    </>
  );
};

export default Clients;
