import { ActionFunctionArgs } from "@remix-run/node";
import { login } from "../data/auth.server";
import { validateCredentials } from "../data/validations.server";
import AuthPage from "../components/auth/AuthForm";

export default function AuthForm() {
    return (
      <div className="container mx-auto p-4">
        <AuthPage />
      </div>
    );
  }

//Executam l'action per iniciar sessió de l'usuari.
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const searchParams = new URL(request.url).searchParams;
    const authMode = searchParams.get("mode") || "login";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        validateCredentials({ email, password });
    } catch (error) {
        return error;
    }
    try {
        if (authMode === "login") {
          return await login({ email, password });
        } else {
            // return await signup({ email, password });
        }
    } catch (error) {
        if (error.status === 422) {
            return {credentials: error.message };
        }
    }
    return {};
}