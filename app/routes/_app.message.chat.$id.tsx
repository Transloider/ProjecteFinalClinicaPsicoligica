import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { getUserID, requireUserSession } from '../data/auth.server';
import { addUserMessage, getMessageBetweenUsers } from '../data/messages.server';
import { Form, Link, redirect, useLoaderData } from '@remix-run/react';
import { Message } from '../types/interfaces';
import { useEffect, useRef, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ca } from 'date-fns/locale';

// Loader per carregar els missatges entre l'usuari i el client
export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const { id } = params; // ID del client
    await requireUserSession(request); // Assegurem que l'usuari està autenticat
    let userMessages = await getMessageBetweenUsers(request, await getUserID(request), id as string);
    // Si no hi ha missatges, establim una conversa nova
    if (userMessages === undefined) {
      userMessages = [];
    }
    return { userMessages, id };
  } catch (error) {
    // Retornem un error si la càrrega falla
    throw new Response('Error loading clients', { status: 500 });
  }
}

// Action per afegir un nou missatge a la conversa
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userMessage = formData.get('message') as string; // Text del missatge
  const client_id = formData.get('client_id') as string; // ID del client destinatari
  try {
    // Afegim el missatge a la base de dades
    await addUserMessage(request, await getUserID(request), client_id, userMessage);
    return redirect(`/message/chat/${client_id}`); // Redirigim a la mateixa pàgina del xat
  } catch (error) {
    throw new Error("Error adding message");
  }
}

const Chat = () => {
  // Carreguem els missatges i el client ID des del loader
  const { userMessages, id } = useLoaderData<{ userMessages: Message[], id: string }>();
  const messageInputRef = useRef<HTMLInputElement>(null); // Referència per l'input del missatge
  const [message, setMessage] = useState(''); // Estat del missatge de l'usuari
  
  // Recarreguem la pàgina automàticament cada 7 segons
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.location.href = `/message/chat/${id}`;
    }, 7000);
    return () => clearTimeout(timeoutId);
  }, [id]);

  // Actualitzem l'estat del missatge amb cada canvi en l'input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // Netegem l'input després d'enviar el formulari
  const handleFormSubmit = () => {
    if (messageInputRef.current) {
      setMessage(''); 
    }
  };

  return (
    <>
      <div className='w-full mt-[5rem]'>
        {/* Enllaç per tornar a la llista d'usuaris */}
        <div className='ml-3'>
          <Link to={`/message/users`} className='bg-blue-600 hover:bg-blue-700 text-white px-2 pb-[1.5px] rounded-t-lg'>
            Endarrere
          </Link>
        </div>
        <div className='text-black h-[75vh] overflow-y-scroll bg-slate-200 rounded-t-md'>
          {/* Mostrem els missatges existents */}
          {userMessages.map((message, index) => (
            <div key={index} className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'} mt-2 mx-2`}>
              <div className='bg-white p-2 rounded-md shadow-md'>
                <p>{message.message}</p>
                <p className='text-xs text-slate-500'>
                  {/* Formatem la data del missatge */}
                  {message.created_at && formatDistanceToNow(parseISO(message.created_at), { addSuffix: true, locale: ca })}
                </p>
              </div>
            </div>
          ))}
          {/* Missatge inicial per una conversa nova */}
          {userMessages.length === 0 && (
            <div className='flex justify-center mt-2'>
              <div className='bg-white p-2 rounded-md shadow-md'>
                <p>Nova conversa</p>
              </div>
            </div>
          )}
        </div>
        {/* Formulari per enviar un nou missatge */}
        <Form method='POST' onSubmit={handleFormSubmit}>
          <div className='flex items-center p-4 bg-white rounded-b-md shadow-md'>
            <input
              ref={messageInputRef}
              type='text'
              name='message'
              className='flex-1 p-2 border border-gray-300 rounded-md'
              placeholder='Enviar mensaje'
              value={message}
              onChange={handleInputChange}
            />
            <input type="hidden" name='client_id' value={id} />
            <button className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md'>
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Chat;
