import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireClientSession } from '../data/auth.server';
import { getClientChats } from '../data/messages.server';
import { ClientUserMessages } from '../types/interfaces';
import ClientChatList from '../components/messages/ClientChatList';

export async function loader({ request,params }: LoaderFunctionArgs) {
  try {
    const{id} = params;
    await requireClientSession(request);
    const userNamesMessages = await getClientChats(request, id as string);
    return {userNamesMessages};
  } catch (error) {
    throw new Error("Error getting Messages");
    
  }
}

const MensajesList = () => {
  const dataLoaderData = useLoaderData<{userNamesMessages: ClientUserMessages}>();
  return (
    <>
      <ClientChatList userClientsChat={dataLoaderData.userNamesMessages}/>
    </>
  );
};

export default MensajesList;
