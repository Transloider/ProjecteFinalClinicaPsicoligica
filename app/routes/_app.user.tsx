import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getUserID, requireUserSession } from '../data/auth.server';
import { getUsers } from '../data/user.server';
import { User } from '../types/interfaces';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await requireUserSession(request);
    const users: User[] = await getUsers(request);
    const user_id = await getUserID(request);
    return {users, user_id};
  } catch (error) {
    throw new Response('Error loading clients', { status: 500 });
  }
}

const Users = () => {
  const {users, user_id} = useLoaderData<{users: User[], user_id: string}>();
  return (
    <>
      <div className='mt-[4rem]'>
        <Outlet context={{users, user_id}}/>
      </div>
    </>
  );
};

export default Users;
