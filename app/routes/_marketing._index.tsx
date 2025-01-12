import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import MainHeader from "../components/navigation/MainHeader";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { passwordClientValidator } from "../utils/validators";
import { LoginClient } from "../types/interfaces";
import { login } from "../data/clients.server";
import { getUserID } from "~/data/auth.server";

// La funció loader s'executa al servidor per carregar dades abans de renderitzar el component
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Obtenim l'ID de l'usuari actual des de la sessió
    const user_id = await getUserID(request);
    return {user_id};
  } catch (error) {
    // Si hi ha un error en obtenir l'ID de l'usuari, llancem una resposta amb error 500
    throw new Response('Error loading clients', { status: 500 });
  }
}

// La funció action s'executa quan el formulari és enviat
export async function action({ request }: ActionFunctionArgs) {
    // Obtenim les dades del formulari (username i password)
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // Creem l'objecte client amb les dades del formulari
    const client: LoginClient = {
      username: username,
      password: password,
    }

    // Validem les dades del client
    const { valid, errors } = passwordClientValidator(client);
    if (!valid) {
        // Si no és vàlid, retornem els errors de validació
        return { errors };
    }
    
    try {
      // Intentem realitzar el login amb les dades del client
      const loginInformation = await login(username, password);
      
      if(loginInformation === "Credencials incorrectes!"){
        // Si les credencials són incorrectes, afegim un error a la resposta
        errors.credentials = loginInformation;
        return {errors};
      } else {
        // Si el login és correcte, retornem la informació de l'usuari
        return loginInformation;
      }
    } catch (error) {
        // En cas d'error, es captura i es mostra a la consola
        console.log("Error updating user");
    } 
}

export default function Index() {
  // Carreguem les dades del loader (ID de l'usuari)
  const useLoader = useLoaderData<{user_id: string}>();
  
  // Carreguem les dades de l'acció, que inclouen possibles errors del formulari
  const actionData = useActionData<{ errors?: Record<string, string> }>();
  const errors = actionData?.errors;

  return (
    <>
      {/* Renderitzem el capçalera principal amb l'ID de l'usuari */}
      <MainHeader user_id={useLoader.user_id}/>
      <div className="flex justify-center items-center p-4 mt-[12rem]">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-4 text-black">Client Login</h1>
          <Form method="post" className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {/* Si hi ha errors relacionats amb el nom d'usuari, els mostrem */}
              {errors?.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {/* Si hi ha errors relacionats amb la contrasenya, els mostrem */}
              {errors?.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            {/* Si hi ha un error de credencials incorrectes, el mostrem */}
            {errors?.credentials && <p className="text-red-500 text-sm">{errors.credentials}</p>}
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
