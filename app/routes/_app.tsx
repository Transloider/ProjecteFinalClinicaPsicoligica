import { Outlet } from '@remix-run/react';
import Aside from '../components/layout/Aside';
import WorkHeader from '../components/navigation/WorkHeader';
import { LoaderFunctionArgs } from '@remix-run/node';
import { requireUserSession } from '../data/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const user_id = await requireUserSession(request);
    return user_id;
  } catch (error) {
    throw new Response('Error loading clients', { status: 500 });
  }
}

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <WorkHeader />
      </header>
      <div className="flex flex-1">
        <aside className="w-1/5 mt-[68px] border-r border-slate-800">
          <Aside />
        </aside>
        <main className="flex-1 px-4 bg-slate-700">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default App;
