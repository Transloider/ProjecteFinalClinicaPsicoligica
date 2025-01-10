import { redirect, useActionData, useNavigation, useOutletContext } from '@remix-run/react';
import UserForm from '../components/user/UserForm';
import { ActionFunctionArgs } from '@remix-run/node';
import { User } from '../types/interfaces';
import { userValidator } from '../utils/validators';
import { updateUser } from '../data/user.server';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const user: User = {
        id: parseInt((formData.get("user_id") as string)),
        name: (formData.get("name") as string).trim(),
        username: (formData.get("username") as string).trim(),
        email: (formData.get("email") as string).trim(),
        phone: (formData.get("phone") as string).trim(),
    };
    const { valid, errors } = userValidator(user);
    if (!valid) {
        return { errors };
    }
    try {
        await updateUser(request, user);
    } catch (error) {
        console.log("Error updating user");
    }
    return redirect("/clients");
}

const UserUpdate = () => {
    const outletData = useOutletContext<{users: User[], user_id:string}>();
    const user = outletData.users.find(({id}) => id === Number(outletData.user_id));
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    const transition = useNavigation();

    const isSubmitting = transition.state === "submitting";

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <UserForm user={user} error={actionData?.errors} isSubmitting={isSubmitting} />
            </div>
        </>
    );
};

export default UserUpdate;
