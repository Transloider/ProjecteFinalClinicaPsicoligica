import { redirect, useActionData, useNavigation, useOutletContext } from '@remix-run/react';
import UserForm from '../components/user/UserForm';
import { ActionFunctionArgs } from '@remix-run/node';
import { User } from '../types/interfaces';
import { userValidator } from '../utils/validators';
import { updateUser } from '../data/user.server';

// Funció que s'executa quan el formulari es subministra (action)
export async function action({ request }: ActionFunctionArgs) {
    // Obtenim les dades del formulari
    const formData = await request.formData();
    const user: User = {
        id: parseInt((formData.get("user_id") as string)),
        name: (formData.get("name") as string).trim(),
        username: (formData.get("username") as string).trim(),
        email: (formData.get("email") as string).trim(),
        phone: (formData.get("phone") as string).trim(),
    };

    // Validem les dades de l'usuari
    const { valid, errors } = userValidator(user);
    if (!valid) {
        // Si la validació falla, retornem els errors
        return { errors };
    }

    try {
        // Intentem actualitzar l'usuari a la base de dades
        const errorMessage = await updateUser(request, user);
        if (errorMessage) {
            // Si hi ha un error en l'actualització, afegim l'error al resultat
            errors.server = errorMessage;
            return { errors }
        }
    } catch (error) {
        // En cas d'error, mostrem el missatge de fallada
        console.log("Error updating user");
    }
    
    // Si tot ha anat bé, redirigim a la pàgina de clients amb un missatge de confirmació
    return redirect(`/clients?message=Perfil%20modificat%20correctament!`);
}

const UserUpdate = () => {
    // Obtenim les dades de l'outlet (usuaris i ID de l'usuari actual)
    const outletData = useOutletContext<{ users: User[], user_id: string }>();
    
    // Busquem l'usuari que volem actualitzar segons la ID
    const user = outletData.users.find(({ id }) => id === Number(outletData.user_id));

    // Obtenim els errors del formulari, si n'hi ha
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    
    // Obtenim l'estat de la navegació per saber si el formulari s'està enviant
    const transition = useNavigation();
    const isSubmitting = transition.state === "submitting";

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {/* Renderitzem el formulari d'usuari amb les dades i errors, si en tenen */}
                <UserForm user={user} error={actionData?.errors} isSubmitting={isSubmitting} />
            </div>
        </>
    );
};

export default UserUpdate;
