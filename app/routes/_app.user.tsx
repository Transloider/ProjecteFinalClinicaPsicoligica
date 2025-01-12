import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getUserID, requireUserSession } from '../data/auth.server';
import { getUsers } from '../data/user.server';
import { User } from '../types/interfaces';

// La funció loader s'executa en el servidor per obtenir les dades abans de renderitzar la pàgina
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Verifiquem que l'usuari està loguejat
    await requireUserSession(request);
    // Obtenim la llista d'usuaris des del servidor
    const users: User[] = await getUsers(request);
    // Obtenim la ID de l'usuari actual
    const user_id = await getUserID(request);
    // Retornem les dades de l'usuari i la llista d'usuaris
    return {users, user_id};
  } catch (error) {
    // Si hi ha un error, llancem una resposta amb un codi d'estat 500
    throw new Response('Error loading clients', { status: 500 });
  }
}

const Users = () => {
  // Obtenim les dades carregades per la funció loader
  const {users, user_id} = useLoaderData<{users: User[], user_id: string}>();
  return (
    <>
      <div className='mt-[4rem]'>
        {/* Outlet permet a les rutes anidades accedir a les dades (users, user_id) */}
        <Outlet context={{users, user_id}}/>
      </div>
    </>
  );
};

export default Users;
