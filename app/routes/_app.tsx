import { Outlet, useLoaderData } from '@remix-run/react';
import Aside from '../components/layout/Aside';
import WorkHeader from '../components/navigation/WorkHeader';
import { LoaderFunctionArgs } from '@remix-run/node';
import { getUserID, requireUserSession } from '../data/auth.server';
import { getUser } from '../data/user.server';
import { User } from '../types/interfaces';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const token = await requireUserSession(request);
    const user: User = await getUser(request,await getUserID(request));
    const isAdmin = user.admin == "1" ? true : false;
    return {token, isAdmin};
  } catch (error) {
    throw new Response('Error loading clients', { status: 500 });
  }
}

const App = () => {
  const loaderData = useLoaderData<{isAdmin:boolean}>();
  return (
    <div className="flex flex-col h-screen">
      <header>
        <WorkHeader />
      </header>
      <div className="flex flex-1">
        <aside className="w-1/5 mt-[68px] border-r border-slate-800 hidden sm:block">
          <Aside isAdmin={loaderData.isAdmin}/>
        </aside>
        <main className="flex-1 px-4 bg-slate-700">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default App;
