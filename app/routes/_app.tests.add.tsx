import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useActionData, useNavigation } from "@remix-run/react";
import { testUpdateValidatior } from "../utils/validators";
import TestsForm from "../components/tests/TestsForm";
import { Test } from "../types/interfaces";
import { addTest } from "../data/tests.server";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const unlimited = formData.get("unlimited") as string;

    // Abans de tot validem que el text sigui correcte
    if (unlimited.trim().toUpperCase() !== "CONFIRMAR") {
        if (unlimited.trim().toUpperCase() !== "DENEGAR") {
            const errors: Record<string, string> = {};
            errors.unlimited = "Opció no vàlida";
            return {errors}
        }
    }
    const test: Test = {
        id: Number(formData.get("testID")),
        name: (formData.get("name") as string).trim(),
        description: formData.get("description") as string,
        quantity: Number(formData.get("quantity")),
        unlimited: unlimited === "CONFIRMAR" ? 1 : 0,
    }
    
    try {
        const {valid, errors} = testUpdateValidatior(test);
        if (!valid) {
            return {errors};
        } else {
            const missatge = await addTest(request, test);
            if (missatge) {
                errors.name = missatge;
                return {errors};
            }
            return redirect("/clients");
        }
    } catch (error) {
        throw new Error("Error updating test");
    }
}

export default function DeleteTest() {
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    const transition = useNavigation();
    const isSubmitting = transition.state === "submitting";
    return (
        <TestsForm error={actionData?.errors} isSubmitting={isSubmitting}/>
    );
}


