import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUserID, requireUserSession } from '../data/auth.server';
import { getUserChats } from '../data/messages.server';
import { UserClientMessages } from '../types/interfaces';
import UsersClientList from '../components/messages/UsersChatLIst';

// Loader per carregar la llista de xats de l'usuari
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await requireUserSession(request); // Assegurem que l'usuari està autenticat
    const userNamesMessages = await getUserChats(request, await getUserID(request)); // Obtenim els xats de l'usuari
    console.log(userNamesMessages); // Debug: Mostrem els missatges obtinguts a la consola
    return { userNamesMessages }; // Retornem les dades al component
  } catch (error) {
    // Gestionem errors en cas que no es puguin obtenir els missatges
    throw new Error("Error getting Messages");
  }
}

const MensajesList = () => {
  // Obtenim les dades del loader
  const dataLoaderData = useLoaderData<{ userNamesMessages: UserClientMessages }>();
  return (
    <>
      {/* Component per mostrar la llista de xats */}
      <UsersClientList userClientsChat={dataLoaderData.userNamesMessages} />
    </>
  );
};

export default MensajesList;
