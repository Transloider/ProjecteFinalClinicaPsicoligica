import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useActionData, useNavigation } from "@remix-run/react";
import { testUpdateValidatior } from "../utils/validators";
import TestsForm from "../components/tests/TestsForm";
import { Test } from "../types/interfaces";
import { addTest } from "../data/tests.server";

// Action per processar el formulari i actualitzar o afegir un test
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const unlimited = formData.get("unlimited") as string;

    // Validem que l'opció introduïda sigui vàlida
    if (unlimited.trim().toUpperCase() !== "CONFIRMAR") {
        if (unlimited.trim().toUpperCase() !== "DENEGAR") {
            const errors: Record<string, string> = {};
            errors.unlimited = "Opció no vàlida"; // Missatge d'error si l'opció no és vàlida
            return { errors };
        }
    }

    // Construïm l'objecte del test a partir de les dades del formulari
    const test: Test = {
        id: Number(formData.get("testID")),
        name: (formData.get("name") as string).trim(),
        description: formData.get("description") as string,
        quantity: Number(formData.get("quantity")),
        unlimited: unlimited === "CONFIRMAR" ? 1 : 0, // Convertim a format numèric
    };

    try {
        // Validem les dades del test
        const { valid, errors } = testUpdateValidatior(test);
        if (!valid) {
            return { errors }; // Retornem errors si la validació falla
        } else {
            // Afegim el test a la base de dades
            const missatge = await addTest(request, test);
            if (missatge) {
                errors.name = missatge; // Gestionem errors específics retornats pel servidor
                return { errors };
            }
            // Redirigim l'usuari si el test s'ha afegit correctament
            return redirect("/clients?message=Test%20afegit%20correctament");
        }
    } catch (error) {
        // Gestionem errors en l'operació
        throw new Error("Error updating test");
    }
}

// Component React per renderitzar el formulari de tests
export default function DeleteTest() {
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    const transition = useNavigation();
    const isSubmitting = transition.state === "submitting"; // Estat del formulari (enviant o no)
    return (
        // Renderitzem el formulari amb possibles errors i estat de càrrega
        <TestsForm error={actionData?.errors} isSubmitting={isSubmitting} />
    );
}
