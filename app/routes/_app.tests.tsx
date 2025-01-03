import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getTests } from '../data/tests.server';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const tests = await getTests(request);
    return json({tests});
  } catch (error) {
    throw new Response('Error loading clients', { status: 500 });
  }
}

const Tests = () => {
  const tests = useLoaderData();
  return (
    <>
      <div className='mt-[4rem]'>
        <Outlet context={tests}/>
      </div>
    </>
  );
};

export default Tests;
