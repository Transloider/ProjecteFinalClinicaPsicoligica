import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { getClientID, requireClientSession } from '../data/auth.server';
import { addClientMessage, getMessageBetweenClients } from '../data/messages.server';
import { Form, Link, redirect, useLoaderData } from '@remix-run/react';
import { Message } from '../types/interfaces';
import { useEffect, useRef, useState } from 'react';
import { ca } from 'date-fns/locale';
import { formatDistanceToNow, parseISO } from 'date-fns';

// Carreguem les dades inicials per a la conversa
export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const { id } = params;
    // Verifiquem que l'usuari té una sessió activa
    await requireClientSession(request);
    // Obtenim els missatges entre els clients
    let userMessages = await getMessageBetweenClients(request, id as string, await getClientID(request));
    if (userMessages === undefined) {
      userMessages = [];
    }
    const client_id = await getClientID(request);
    return { userMessages, id ,client_id};
  } catch (error) {
    // En cas d'error, llancem una resposta amb un codi 500
    throw new Response('Error loading clients', { status: 500 });
  }
}

// Funció que s'executa quan s'envia el formulari per afegir un missatge
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userMessage = formData.get('message') as string;
  const user_id = formData.get('user_id') as string;
  try {
    // Afegim el missatge del client a la base de dades
    await addClientMessage(request, user_id, await getClientID(request), userMessage);
    // Un cop enviat el missatge, redirigim a la pàgina de la conversa
    return redirect(`/chat/${user_id}`);
  } catch (error) {
    // En cas d'error, llançem un error personalitzat
    throw new Error("Error adding message");
  }
}

const Chat = () => {
  // Obtenim les dades carregades (missatges, id de l'usuari i client_id)
  const { userMessages, id, client_id } = useLoaderData<{ userMessages: Message[], id: string , client_id: string}>();
  const [message, setMessage] = useState('');
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Actualitzem la pàgina cada 7 segons per mostrar nous missatges
    const timeoutId = setTimeout(() => {
      window.location.href = `/chat/${id}`;
    }, 7000);
    return () => clearTimeout(timeoutId);
  }, [id]);

  // Manejador d'entrada del formulari (actualitza el missatge)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // Manejador de l'enviament del formulari (reseteja el camp de missatge)
  const handleFormSubmit = () => {
    if (messageInputRef.current) {
      setMessage('');
    }
  };

  return (
    <>
      <div className='w-full pt-[3rem] px-[5rem]'>
        <div className='ml-3'>
          {/* Enllaç per tornar a la pàgina de l'usuari */}
          <Link to={`/users/${client_id}`} className='bg-blue-600 hover:bg-blue-700 text-white px-2 pb-[1.5px] rounded-t-lg'>
            Endarrere
          </Link>
        </div>
        <div className='text-black h-[75vh] overflow-y-scroll bg-slate-200 rounded-t-md'>
          {/* Mostrem els missatges de la conversa */}
          {userMessages.map((message, index) => (
            <div key={index} className={`flex ${message.sender_type === 'client' ? 'justify-end' : 'justify-start'} mt-2`}>
              <div className='bg-white p-2 mx-2 rounded-md shadow-md'>
                <p>{message.message}</p>
                <p className='text-xs text-slate-500'>
                  {/* Mostrem la data del missatge relativament a l'actualitat */}
                  {message.created_at && formatDistanceToNow(parseISO(message.created_at), { addSuffix: true, locale: ca })}
                </p>
              </div>
            </div>
          ))}
          {/* Si no hi ha missatges, mostrem un missatge indicant-ho */}
          {userMessages.length === 0 && (
            <div className='flex justify-center mt-2'>
              <div className='bg-white p-2 rounded-md shadow-md'>
                <p>Nova conversa</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
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
            {/* Input ocult per passar l'ID de l'usuari amb qui estem conversant */}
            <input type="hidden" name='user_id' value={id} />
            {/* Botó per enviar el missatge */}
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
