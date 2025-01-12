import {
  redirect,
  useActionData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { Migration, User } from "../types/interfaces";
import { migrationValidator } from "../utils/validators";
import UserMigrationForm from "../components/user/UserMigrationForm";
import { getUser, migrateUsersReports } from "~/data/user.server";
import { getUserID, requireUserSession } from "~/data/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    try {
        await requireUserSession(request); // Comprova si l'usuari està logat
        const user: User = await getUser(request, await getUserID(request));
        const isAdmin = user.admin == "1" ? true : false;
        if (!isAdmin) {
            return redirect('/clients'); // Si no és administrador, redirigeix a la pàgina de clients
        }
        return {};
    } catch (error) {
        throw new Error("Error getting User");
    }    
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const migration: Migration = {
    newUser: formData.get('newUserId') as string,
    oldUser: formData.get('oldUserId') as string,
  }

  // Validació de la migració
  const { valid, errors } = migrationValidator(migration);
  if (!valid) {
    return { errors }; // Si hi ha errors de validació, retornem-los
  }

  try {
    // Realitzem la migració
    await migrateUsersReports(request, migration);
  } catch (error) {
    console.log("Error doing migration");
    // En cas d'error, retornem un missatge d'error general
    return { errors: { migration: "Error al realitzar la migració. Intenta-ho de nou." } };
  }

  // Redirigim a la pàgina de clients amb un missatge d'èxit
  return redirect(`/clients/?message=Informes%20del%20treballador%20migrats%20correctament!`);
}

const UsersMigrations = () => {
  const outletData = useOutletContext<{ users: User[]; user_id: string }>();
  const actionData = useActionData<{ errors?: Record<string, string> }>();
  const transition = useNavigation();

  const isSubmitting = transition.state === "submitting";

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <UserMigrationForm
          user={outletData.user_id}
          users={outletData.users}
          error={actionData?.errors} // Passant errors a la UI
          isSubmitting={isSubmitting}
        />
        {/* Mostrar errors si existeixen */}
        {actionData?.errors?.migration && (
          <div className="text-red-600 mt-4">
            <p>{actionData.errors.migration}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersMigrations;
