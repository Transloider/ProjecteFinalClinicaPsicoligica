import { ActionFunctionArgs } from "@remix-run/node";
import MainHeader from "../components/navigation/MainHeader";
import { Form, useActionData } from "@remix-run/react";
import { passwordClientValidator } from "../utils/validators";
import { LoginClient } from "../types/interfaces";
import { login } from "../data/clients.server";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const client: LoginClient = {
      username: username,
      password: password,
    }
    const { valid, errors } = passwordClientValidator(client);
    if (!valid) {
        return { errors };
    }
    try {
      return await login(username,password);
    } catch (error) {
        console.log("Error updating user");
    }
    
}

export default function Index() {
  const actionData = useActionData<{ errors?: Record<string, string> }>();
  const errors = actionData?.errors;

  return (
    <>
      <MainHeader />
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
              {errors?.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
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
