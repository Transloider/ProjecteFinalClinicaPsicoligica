import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUserID, requireUserSession } from '../data/auth.server';
import { getUserChats } from '../data/messages.server';
import { UserClientMessages } from '../types/interfaces';
import UsersClientList from '../components/messages/UsersChatLIst';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await requireUserSession(request);
    const userNamesMessages = await getUserChats(request, await getUserID(request));
    console.log(userNamesMessages);
    return {userNamesMessages};
  } catch (error) {
    throw new Error("Error getting Messages");
    
  }
}

const MensajesList = () => {
  const dataLoaderData = useLoaderData<{userNamesMessages: UserClientMessages}>();
  return (
    <>
      <UsersClientList userClientsChat={dataLoaderData.userNamesMessages}/>
    </>
  );
};

export default MensajesList;
