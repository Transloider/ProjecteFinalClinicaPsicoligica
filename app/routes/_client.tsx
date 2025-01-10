import { Outlet } from '@remix-run/react';
import { requireClientSession } from '../data/auth.server';
import { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const token = await requireClientSession(request);
    return {token};
  } catch (error) {
    throw new Response('Error require client token', { status: 500 });
  }
}

const App = () => {
  return (
    <div>
        <Outlet/>
    </div>
  );
};

export default App;
