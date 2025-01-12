import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireClientSession } from '../data/auth.server';
import { getClientChats } from '../data/messages.server';
import { ClientUserMessages } from '../types/interfaces';
import ClientChatList from '../components/messages/ClientChatList';

// La funció loader s'executa al servidor per obtenir les dades necessàries
export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const { id } = params; // Obtenim l'ID de la ruta (client)
    // Verifiquem que el client té una sessió activa
    await requireClientSession(request);
    // Obtenim els missatges de xat del client
    const userNamesMessages = await getClientChats(request, id as string);
    return { userNamesMessages };
  } catch (error) {
    // Si hi ha un error en obtenir els missatges, llancem un error
    throw new Error("Error getting Messages");
  }
}

const MensajesList = () => {
  // Obtenim les dades carregades pel loader
  const dataLoaderData = useLoaderData<{ userNamesMessages: ClientUserMessages }>();
  return (
    <>
      {/* Renderitzem la llista de converses del client amb el component ClientChatList */}
      <ClientChatList userClientsChat={dataLoaderData.userNamesMessages} />
    </>
  );
};

export default MensajesList;
