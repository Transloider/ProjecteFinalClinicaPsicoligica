import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { requireUserSession,getUserID } from '../data/auth.server';
import { getUser } from '../data/user.server';
import { User } from '../types/interfaces';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await requireUserSession(request);
    const user_id = await getUserID(request);
    const user: User = await getUser(request, user_id as string);
    return user;
  } catch (error) {
    throw new Response('Error loading clients', { status: 500 });
  }
}

const Users = () => {
  const user = useLoaderData<User>();
  return (
    <>
      <div className='mt-[4rem]'>
        <Outlet context={user}/>
      </div>
    </>
  );
};

export default Users;
