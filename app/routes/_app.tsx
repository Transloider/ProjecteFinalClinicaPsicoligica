import { Outlet, useLoaderData } from '@remix-run/react';
import Aside from '../components/layout/Aside';
import WorkHeader from '../components/navigation/WorkHeader';
import { LoaderFunctionArgs } from '@remix-run/node';
import { getUserID, requireUserSession } from '../data/auth.server';
import { getUser } from '../data/user.server';
import { User } from '../types/interfaces';

// Funció de loader per carregar la informació de l'usuari i verificar si és administrador
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Obtenim el token de sessió per verificar si l'usuari està autenticat
    const token = await requireUserSession(request);
    
    // Obtenim la informació de l'usuari per verificar si és administrador
    const user: User = await getUser(request, await getUserID(request));
    
    // Verifiquem si l'usuari és administrador. Es podria optar per un valor booleà en lloc de fer una comparació de strings
    const isAdmin = user.admin == "1";
    
    // Retornem les dades necessàries per al renderitzat
    return { token, isAdmin };
  } catch (error) {
    // Si hi ha un error, llançem una resposta d'error 500
    throw new Response('Error loading clients', { status: 500 });
  }
}

const App = () => {
  // Carreguem les dades del loader per saber si l'usuari és administrador
  const loaderData = useLoaderData<{ isAdmin: boolean }>();
  
  return (
    <div className="flex flex-col h-screen">
      <header>
        {/* El component WorkHeader és responsable de la capçalera de la pàgina */}
        <WorkHeader />
      </header>
      <head>
        <title>Clinica</title>
      </head>
      <div className="flex flex-1">
        <aside className="w-1/5 mt-[68px] border-r border-slate-800 hidden sm:block">
          {/* El component Aside es mostra només per a usuaris administradors o en pantalles grans */}
          <Aside isAdmin={loaderData.isAdmin} />
        </aside>
        <main className="flex-1 px-4 bg-slate-700">
          {/* Aquí es renderitzarà el contingut dinàmic de cada subcomponent de la pàgina */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
