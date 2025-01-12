import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getTests } from '../data/tests.server';

// Funció loader per obtenir les dades dels tests
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Recuperem els tests des del servidor
    const tests = await getTests(request);
    return json({ tests }); // Retornem els tests en format JSON
  } catch (error) {
    // Gestionem l'error en cas de fallada al carregar els tests
    throw new Response('Error loading clients', { status: 500 });
  }
}

// Component principal que mostra els tests i el seu contingut
const Tests = () => {
  // Obtenim les dades dels tests mitjançant useLoaderData
  const tests = useLoaderData();

  return (
    <>
      <div className='mt-[4rem]'>
        {/* Outlet per renderitzar les rutes fills amb el context dels tests */}
        <Outlet context={tests}/>
      </div>
    </>
  );
};

export default Tests;
