import {
  redirect,
  useActionData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Migration, User } from "../types/interfaces";
import { migrationValidator } from "../utils/validators";
import UserMigrationForm from "../components/user/UserMigrationForm";
import { migrateUsersReports } from "~/data/user.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const migration: Migration = {
    newUser: formData.get('newUserId') as string,
    oldUser: formData.get('oldUserId') as string,
  }
  const { valid, errors } = migrationValidator(migration);
  if (!valid) {
    return { errors };
  }
  try {
    await migrateUsersReports(request, migration);
  } catch (error) {
    console.log("Error doing migration");
  }
  return redirect("/user/migrate");
}

const UsersMigrations = () => {
  const outletData = useOutletContext<{ users: User[]; user_id: string }>();
  const actionData = useActionData<{ errors?: Record<string, string> }>();
  const transition = useNavigation();

  const isSubmitting = transition.state === "submitting";

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <UserMigrationForm user={outletData.user_id} users={outletData.users} error={actionData} isSubmitting={isSubmitting}/>
      </div>
    </>
  );
};

export default UsersMigrations;
