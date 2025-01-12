import { ActionFunctionArgs } from "@remix-run/node";
import { login } from "../data/auth.server"; // Funció per realitzar l'autenticació de l'usuari
import { validateCredentials } from "../data/validations.server"; // Funció per validar les credencials de l'usuari
import AuthPage from "../components/auth/AuthForm"; // Component que mostra el formulari d'autenticació
import { useActionData } from "@remix-run/react"; // Hook per obtenir les dades de l'acció

export default function AuthForm() {
    // Obtenim possibles errors d'autenticació a partir de la resposta de l'acció
    const actionData = useActionData<{credentials: string}>();
    
    return (
      <div className="container mx-auto p-4">
        {/* Renderitzem el formulari d'autenticació i passem l'error (si hi ha) */}
        <AuthPage error={actionData?.credentials}/>
      </div>
    );
}

// Aquesta funció s'executa quan s'envia el formulari d'inici de sessió
export async function action({ request }: ActionFunctionArgs) {
    // Obtenim les dades del formulari enviades
    const formData = await request.formData();
    // Obtenim els paràmetres de la URL (mode: login o registre)
    const searchParams = new URL(request.url).searchParams;
    const authMode = searchParams.get("mode") || "login"; // Per defecte, és login
    const user = formData.get("user") as string; // Nom d'usuari
    const password = formData.get("password") as string; // Contrasenya

    try {
        // Validem les credencials de la contrasenya (per exemple, longitud mínima, etc.)
        validateCredentials(password);
    } catch (error) {
        // Si la validació falla, retornem l'error de validació
        return error;
    }

    try {
        // Si el mode és "login", intentem iniciar sessió
        if (authMode === "login") {
          return await login({ user, password });
        }
    } catch (error) {
        // Si hi ha un error durant el login, el mostrem a la consola
        console.log(error);
    }

    // Si no hi ha errors, retornem un objecte buit
    return {};
}
