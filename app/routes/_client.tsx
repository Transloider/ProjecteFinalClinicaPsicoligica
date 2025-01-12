import { Outlet } from '@remix-run/react';
import { requireClientSession } from '../data/auth.server';
import { LoaderFunctionArgs } from '@remix-run/node';

// La funció loader s'executa al servidor per carregar les dades inicials
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Verifiquem que el client té una sessió activa i obtenim el token
    const token = await requireClientSession(request);
    return {token};
  } catch (error) {
    // Si hi ha un error en la verificació de la sessió, llancem una resposta amb codi 500
    throw new Response('Error require client token', { status: 500 });
  }
}

const App = () => {
  return (
    <div>
      {/* L'Outlet permet renderitzar les rutes anidades en aquest punt */}
      <Outlet/>
    </div>
  );
};

export default App;
