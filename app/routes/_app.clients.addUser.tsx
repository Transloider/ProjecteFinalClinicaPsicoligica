import { Form, redirect, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { userFormValidator } from "../utils/validators";
import { getUserID, requireUserSession } from "../data/auth.server";
import { User } from "../types/interfaces";
import { addUser, getUser } from "../data/user.server";

// Carregar dades de l'usuari per verificar que està logat
export const loader: LoaderFunction = async ({ request }) => {
    try {
        await requireUserSession(request); // Comprova si l'usuari està logat
        const user: User = await getUser(request,await getUserID(request));
        const isAdmin = user.admin == "1" ? true : false;
        if (!isAdmin) {
            return redirect('/clients'); // Si no és administrador, redirigeix a la pàgina de clients
        }
        return {};
    } catch (error) {
        throw new Error("Error getting User");
    }    
};

// Funció per gestionar l'acció de creació d'un nou treballador
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData(); // Obtenir les dades del formulari
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const user: User = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: password,
    }
    const { valid, errors } = userFormValidator(user); // Validació de les dades
    if (!valid) {
        return { errors }; // Si hi ha errors, els retorna
    }
    try {
        const messageError = await addUser(request, user); // Afegir usuari a la base de dades
        if (messageError) {
            errors.server = messageError; // Si hi ha un error a la creació, es gestiona
            return { errors };
        }
        return redirect(`/clients?message=Treballador%20registrat%20correctament!`); // Redirigeix amb missatge de confirmació
    } catch (error) {
        throw new Error(`Error adding User: ${error}`);
    }
}

// Component de creació d'usuari
export default function CreateUser() {
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    return (
        <div className="bg-white p-8 rounded shadow-md text-black">
            <Form method="post">
                <h1 className="text-2xl font-bold mb-4 text-black" aria-labelledby="form-title">Donar d&apos;alta treballador</h1>
                <div className="bg-gray-200 text-justify p-2 rounded mb-2" role="alert" aria-live="assertive">
                    <p>Atenció: En cas de registrar un treballador, tingui en compte que aquest podrà fer ús de les funcionalitats del programa, excepte aquelles exclusives per a l&apos;administrador.</p>
                </div>
                <label htmlFor="name" className="block text-black mb-2" aria-label="Nom del treballador">Nom</label>
                <input 
                    type="text" 
                    name="name" 
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white"
                    required
                    aria-required="true"
                    aria-describedby="name-error"
                />
                {actionData?.errors?.name && <p id="name-error" className="text-red-500 text-sm">{actionData.errors.name}</p>} {/* Missatge d'error si el nom és incorrecte */}

                <label htmlFor="username" className="block text-black mb-2" aria-label="Nom d&apos;usuari">Nom d&apos;usuari</label>
                <input 
                    type="text" 
                    name="username" 
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white"
                    required
                    aria-required="true"
                    aria-describedby="username-error"
                />
                {actionData?.errors?.username && <p id="username-error" className="text-red-500 text-sm">{actionData.errors.username}</p>} {/* Missatge d'error si el nom d'usuari és incorrecte */}
                
                <label htmlFor="email" aria-label="Correu electrònic">Correu</label>
                <input 
                    type="email" 
                    name="email" 
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                    required
                    aria-required="true"
                    aria-describedby="email-error"
                />
                {actionData?.errors?.email && <p id="email-error" className="text-red-500 text-sm">{actionData.errors.email}</p>} {/* Missatge d'error si el correu és incorrecte */}
                
                <label htmlFor="phone" aria-label="Telèfon de contacte">Telèfon de contacte</label>
                <input 
                    type="text" 
                    name="phone" 
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                    required
                    aria-required="true"
                    aria-describedby="phone-error"
                />
                {actionData?.errors?.phone && <p id="phone-error" className="text-red-500 text-sm">{actionData.errors.phone}</p>} {/* Missatge d'error si el telèfon és incorrecte */}

                <label htmlFor="password" aria-label="Contrassenya">Contrassenya</label>
                <input 
                    type="password" 
                    name="password" 
                    className="border border-gray-300 rounded w-full p-2 mb-1 text-white" 
                    required
                    aria-required="true"
                    aria-describedby="password-error"
                />
                {actionData?.errors?.password && <p id="password-error" className="text-red-500 text-sm">{actionData.errors.password}</p>} {/* Missatge d'error si la contrasenya és incorrecta */}
                {actionData?.errors?.server && <p id="server-error" className="text-red-500 text-sm">{actionData.errors.server}</p>} {/* Missatge d'error del servidor si hi ha algun error */}
                
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
                    aria-label="Registrar treballador"
                >
                    Registrar Treballador
                </button>
            </Form>
        </div>
    );
}
