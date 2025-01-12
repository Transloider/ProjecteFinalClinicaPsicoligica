import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useActionData, useMatches, useNavigation } from "@remix-run/react";
import { Test } from "../types/interfaces";
import { testUpdateValidatior } from "../utils/validators";
import { useState } from "react";
import TestsForm from "../components/tests/TestsForm";
import { updateTest } from "~/data/tests.server";

// Funció d'acció per a gestionar l'actualització d'un test
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const unlimited = formData.get("unlimited") as string;

    // Validem el valor del camp "unlimited"
    if (unlimited.trim().toUpperCase() !== "CONFIRMAR" && unlimited.trim().toUpperCase() !== "DENEGAR") {
        const errors: Record<string, string> = {};
        errors.unlimited = "Opció no vàlida";
        return { errors };
    }

    // Creem l'objecte del test a partir de les dades del formulari
    const test: Test = {
        id: Number(formData.get("testID")),
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        quantity: Number(formData.get("quantity")),
        unlimited: unlimited === "CONFIRMAR" ? 1 : 0,
    };

    try {
        // Validem el test
        const { valid, errors } = testUpdateValidatior(test);
        if (!valid) {
            return { errors };
        } else {
            // Actualitzem el test i redirigim si tot és correcte
            await updateTest(request, test);
            return redirect("/clients");
        }
    } catch (error) {
        throw new Error("Error updating test");
    }
}

export default function UpdateTest() {
    // Obtenim els errors retornats per l'acció
    const errorAction = useActionData<{ errors?: Record<string, string> }>();

    // Obtenim els tests de la ruta pare
    const matchedRoute = useMatches();
    const tests = matchedRoute.find((match) => match.id === "routes/_app.tests");

    // Estat per emmagatzemar el test seleccionat
    const [selectedTest, setSelectedTest] = useState<Test | null>(null);

    // Funció per gestionar el canvi de selecció
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const testsData = (tests?.data as { tests: Test[] }).tests;

        if (selectedValue === "") {
            setSelectedTest(null);
        } else {
            const test = testsData.find((test) => test.id === Number(selectedValue));
            setSelectedTest(test || null);
        }
    };

    // Comprovem si estem enviant el formulari
    const transition = useNavigation();
    const isSubmitting = transition.state === "submitting";

    return (
        <>
            <div className="bg-white p-8 rounded shadow-md text-black">
                <h1 className="text-2xl font-bold">Modificar Test</h1>
                <label htmlFor="selectTest">Selecciona el test que vulguis modificar</label>
                <select
                    name="testID"
                    id="selectedTest"
                    className="block px-2 py-1 rounded-md text-white"
                    onChange={handleSelectChange}
                >
                    <option value="">Selecciona</option>
                    {(tests?.data as { tests: Test[] }).tests.map((test: Test) => (
                        <option key={test.id} value={test.id}>
                            {test.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-3">
                {selectedTest ? 
                // Renderitzem el formulari amb el test seleccionat
                <TestsForm key={selectedTest.id} test={selectedTest} error={errorAction?.errors} isSubmitting={isSubmitting}/> 
                :  
                // Missatge quan no hi ha cap test seleccionat
                <div className="bg-gray-500 p-8 rounded shadow-md text-black text-center">
                    <p className="text-white">Selecciona un test per mostrar el formulari</p>
                </div>}
            </div>
        </>
    );
}
