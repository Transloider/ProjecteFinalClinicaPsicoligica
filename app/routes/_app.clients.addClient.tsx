// app/components/CreateClient.tsx
import { Form, redirect, useActionData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { addClient } from "../data/clients.server";
import { getUserForSession } from "../data/auth.server";
import { Client } from "../types/interfaces";
import { clientValidator } from "../utils/validators";

// Funció per gestionar l'acció de crear un client
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
        name: name,
        email: email,
        address: address,
        gender: gender,
        born_date: born_date,
        phone: phone,
        username: username,
        password: password,
    }
    
    // Validem el client utilitzant un validador
    const { valid, errors } = clientValidator(client);
    if (!valid) {
        return { errors };  // Si no és vàlid, retornem els errors de validació
    }

    let token;
    try {
        token = await getUserForSession(request);  // Obtenim el token de sessió de l'usuari
    } catch (error) {
        console.log(error);
    }

    if (!token) {
        return { error: "Token is required" };  // Si no hi ha token, retornem un error
    }

    try {
        // Creem el client a la base de dades
        const client = await addClient(
            token as string, 
            name as string, 
            email as string, 
            address as string, 
            gender as string, 
            born_date as string, 
            phone as string, 
            username as string, 
            password as string
        );
        //si peta retorna el missatge, sino l'usuari, per tant si fem el 
        //client.name i funciona serà senyal que és l'usuari
        if(!client.name){
            errors.server = client;
            return {errors};
        }
        return redirect(`/clients/${client.id}?message=Client%20afegit%20correctament!`);  // Redirigim després de la creació exitosa
    } catch (error) {
        console.log('Error creating client', error);  // Si hi ha un error, el loguegem
    }
}

// Component per crear un nou client
export default function CreateClient() {
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    return (
        <div className="bg-white p-8 rounded shadow-md text-black">
            <Form method="post" aria-labelledby="create-client-form">
                <h1 className="text-2xl font-bold mb-4 text-black" id="create-client-form">Nou Client</h1>

                {/* Formulari per introduir les dades del client */}
                <label htmlFor="name" className="block text-black mb-2" aria-label="Nom del client">Nom</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white"
                    required
                    aria-describedby="name-error"
                />
                {/* Mostrem els errors de validació per al nom si existeixen */}
                {actionData?.errors?.name && <p id="name-error" className="text-red-500 text-sm">{actionData.errors.name}</p>}

                {/* Camp per introduir el correu electrònic */}
                <label htmlFor="email" aria-label="Correu electrònic">Correu</label>
                <input 
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                    type="email" 
                    name="email" 
                    id="email"
                    required
                    aria-describedby="email-error"
                />
                {actionData?.errors?.email && <p id="email-error" className="text-red-500 text-sm">{actionData.errors.email}</p>}

                {/* Camp per introduir la direcció */}
                <label htmlFor="address" aria-label="Direcció del client">Drecció</label>
                <input 
                    type="text" 
                    name="address" 
                    id="address"
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                    required
                    aria-describedby="address-error"
                />
                {actionData?.errors?.address && <p id="address-error" className="text-red-500 text-sm">{actionData.errors.address}</p>}
                
                {/* Camp per introduir el telèfon */}
                <label htmlFor="phone" aria-label="Telèfon de contacte">Telèfon de contacte</label>
                <input 
                    type="text" 
                    name="phone" 
                    id="phone"
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                    required
                    aria-describedby="phone-error"
                />
                {actionData?.errors?.phone && <p id="phone-error" className="text-red-500 text-sm">{actionData.errors.phone}</p>}

                {/* Camp per la data de naixement */}
                <label htmlFor="born_date" aria-label="Data de naixement">Data de neixament</label>
                <input 
                    type="date" 
                    name="born_date" 
                    id="born_date"
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                    required
                    aria-describedby="born_date-error"
                />
                {actionData?.errors?.born_date && <p id="born_date-error" className="text-red-500 text-sm">{actionData.errors.born_date}</p>}

                {/* Camp per seleccionar el gènere */}
                <label htmlFor="gender" aria-label="Selecciona el gènere del client">Gènere</label>
                <select 
                    name="gender" 
                    id="gender"
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                    required
                    aria-describedby="gender-error"
                >
                    <option value="Male">Masculí</option>
                    <option value="Female">Femení</option>
                    <option value="Other" selected>Altres</option>
                </select>
                {actionData?.errors?.gender && <p id="gender-error" className="text-red-500 text-sm">{actionData.errors.gender}</p>}

                {/* Secció per a les dades d'inici de sessió */}
                <div className="p-3 border rounded my-3">
                    <h2 className="text-xl" aria-label="Dades d'inici de sessió">Iniciar Sessió Chat</h2>
                    <label htmlFor="username" aria-label="Nom d'usuari per a l'inici de sessió">Nom d&apos;usuari</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                        required
                        aria-describedby="username-error"
                    />
                    {actionData?.errors?.username && <p id="username-error" className="text-red-500 text-sm">{actionData.errors.username}</p>}
                    
                    <label htmlFor="password" aria-label="Contrasenya per a l'inici de sessió">Password</label>                    
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                        required
                        aria-describedby="password-error"
                    />
                    {actionData?.errors?.password && <p id="password-error" className="text-red-500 text-sm">{actionData.errors.password}</p>}
                </div>
                {actionData?.errors?.server && <p className="text-red-500 text-sm mb-2">{actionData.errors.server}</p>}
                {/* Botó per enviar el formulari */}
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    aria-label="Crear client"
                >
                    Crear
                </button>
            </Form>
        </div>
    );
}
