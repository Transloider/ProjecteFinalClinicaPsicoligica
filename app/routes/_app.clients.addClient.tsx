import { Form, redirect, useActionData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { addClient } from "../data/clients.server";
import { getUserForSession } from "../data/auth.server";
import { Client } from "../types/interfaces";
import { clientValidator } from "../utils/validators";


export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const gender = formData.get("gender") as "Male" | "Female" | "Other" | undefined;
    const born_date = formData.get("born_date") as string;
    const phone = formData.get("phone") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const client: Client = {
        name,
        email,
        address,
        gender,
        born_date,
        phone,
        username,
        password
    }
    const  { valid, errors } = clientValidator(client);
    if (!valid) {
        return {errors};
    }


    let token
    try {
        token = await getUserForSession(request);
    } catch (error) {
        console.log(error);
    }

    if (!token) {
        return {error: "Token is required"};
    }
    try {
        const client: Client = await addClient(token as string, name as string, email as string, address as string, gender as string, born_date as string, phone as string, username as string, password as string);
        return redirect(`/clients/${client.id}`);
    } catch (error) {
        console.log('Create report',error);
    }
}

export default function CreateClient() {
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    return (
        <div className="bg-white p-8 rounded shadow-md text-black">
            <Form method="post">
                <h1 className="text-2xl font-bold mb-4 text-black">Nou Client</h1>
                <label htmlFor="name" className="block text-black mb-2">Nom</label>
                <input 
                    type="text" 
                    name="name" 
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white"
                    required
                />
                {actionData?.errors?.name && <p className="text-red-500 text-sm">{actionData.errors.name}</p>}
                <label htmlFor="email">Correu</label>
                <input className="border border-gray-300 rounded w-full p-2 mb-1 text-white" type="email" name="email" required/>
                {actionData?.errors?.email && <p className="text-red-500 text-sm">{actionData.errors.email}</p>}

                <label htmlFor="address">Drecció</label>
                <input type="text" name="address" className="border border-gray-300 rounded w-full p-2 mb-1 text-white" required/>
                {actionData?.errors?.address && <p className="text-red-500 text-sm">{actionData.errors.address}</p>}
                
                <label htmlFor="phone">Telèfon de contacte</label>
                <input type="text" name="phone" className="border border-gray-300 rounded w-full p-2 mb-1 text-white" required/>
                {actionData?.errors?.phone && <p className="text-red-500 text-sm">{actionData.errors.phone}</p>}

                <label htmlFor="born_date">Data de neixament</label>
                <input type="date" name="born_date" className="border border-gray-300 rounded w-full p-2 mb-1 text-white" required/>
                {actionData?.errors?.born_date && <p className="text-red-500 text-sm">{actionData.errors.born_date}</p>}

                <label htmlFor="gender">Gènere</label>
                <select name="gender" className="border border-gray-300 rounded w-full p-2 mb-1 text-white" required>
                    <option value="Male">Masculí</option>
                    <option value="Female">Femení</option>
                    <option value="Other" selected>Altres</option>
                </select>
                {actionData?.errors?.gender && <p className="text-red-500 text-sm">{actionData.errors.gender}</p>}

                <div className="p-3 border rounded my-3">
                    <h2 className="text-xl">Iniciar Sessió Chat</h2>
                    <label htmlFor="username">Nom d&apos;usuari</label>
                    <input type="text" name="username" className="border border-gray-300 rounded w-full p-2 mb-1 text-white" required/>
                    {actionData?.errors?.username && <p className="text-red-500 text-sm">{actionData.errors.username}</p>}
                    
                    <label htmlFor="password">Password</label>                    
                    <input type="password" name="password" className="border border-gray-300 rounded w-full p-2 mb-1 text-white" required/>
                    {actionData?.errors?.password && <p className="text-red-500 text-sm">{actionData.errors.password}</p>}
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Crear
                </button>
            </Form>
        </div>
    );
}


