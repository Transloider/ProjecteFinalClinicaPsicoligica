import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { getClientID, requireClientSession } from '../data/auth.server';
import { addClientMessage, getMessageBetweenClients,  } from '../data/messages.server';
import { Form, redirect, useLoaderData } from '@remix-run/react';
import { Message } from '../types/interfaces';
import { useRef, useState } from 'react';

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const { id } = params;
    await requireClientSession(request);
    let userMessages = await getMessageBetweenClients(request,  id as string, await getClientID(request));
    console.log(userMessages);
    if (userMessages === undefined) {
      userMessages = [];
    }
    return { userMessages, id };
  } catch (error) {
    throw new Response('Error loading clients', { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userMessage = formData.get('message') as string;
  const user_id = formData.get('user_id') as string;
  try {
    await addClientMessage(request, user_id, await getClientID(request), userMessage);
    return redirect(`/chat/${user_id}`);
  } catch (error) {
    throw new Error("Error adding message");
  }
}

const Chat = () => {
  const { userMessages, id } = useLoaderData<{ userMessages: Message[], id: string }>();
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = () => {
    if (messageInputRef.current) {
      setMessage(''); 
    }
  };

  return (
    <>
      <div className='w-full pt-[5rem] px-[5rem]'>
        <div className='text-black h-[75vh] overflow-y-scroll bg-slate-200 rounded-t-md'>
          {userMessages.map((message, index) => (
            <div key={index} className={`flex ${message.sender_type === 'client' ? 'justify-end' : 'justify-start'} mt-2`}>
              <div className='bg-white p-2 rounded-md shadow-md'>
                <p>{message.message}</p>
              </div>
            </div>
          ))}
        {userMessages.length === 0 && (
          <div className='flex justify-center mt-2'>
            <div className='bg-white p-2 rounded-md shadow-md'>
              <p>Nova conversa</p>
            </div>
          </div>
        )}
        </div>
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
            <input type="hidden" name='user_id' value={id} />
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
