import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getClients } from '../data/clients.server';
import { requireUserSession } from '../data/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const user_id = await requireUserSession(request);
    const clients = await getClients(user_id);
    return json({clients});
  } catch (error) {
    throw new Response('Error loading clients', { status: 500 });
  }
}

const Clients = () => {
  const clients = useLoaderData();
  return (
    <>
      <div className='mt-[4rem]'>
        <Outlet context={clients}/>
      </div>
    </>
  );
};

export default Clients;
