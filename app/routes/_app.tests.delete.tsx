import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useMatches } from "@remix-run/react";
import { Test } from "../types/interfaces";
import { testRemoveValidator } from "../utils/validators";
import { removeTest } from "../data/tests.server";

// Acció per eliminar un test
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const testID = formData.get("testID") as string; // Obtenim l'ID del test des del formulari
    try {
        // Validem que l'ID del test sigui correcte
        const { valid, errors } = testRemoveValidator(Number(testID));
        if (!valid) {
            return { errors }; // Retornem errors si la validació falla
        } else {
            // Eliminem el test de la base de dades
            await removeTest(request, testID);
            return redirect("/clients?message=Test%20eliminat%20correctament"); // Redirigim després d'eliminar
        }
    } catch (error) {
        // Gestionem errors en cas de fallada en l'eliminació
        console.log("Error removing test", error);
    }
}

// Component React per gestionar la interfície d'eliminació de tests
export default function DeleteTest() {
    const matchedRoute = useMatches(); // Obtenim informació sobre les rutes actuals
    const tests = matchedRoute.find(
        (match) => match.id === "routes/_app.tests" // Busquem les dades dels tests a la ruta corresponent
    );

    // Handler per confirmar abans d'enviar el formulari
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const confirmMessage =
            "Estàs segur que vols eliminar aquest test? Aquesta acció no es pot desfer.";
        if (!window.confirm(confirmMessage)) {
            e.preventDefault(); // Cancel·lem l'enviament si l'usuari no confirma
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md">
            <Form method="post" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4 text-black">Nou Test</h1>
                {/* Etiqueta per al selector de tests */}
                <label htmlFor="test" className="text-black">Selecciona el test a eliminar</label>
                <select name="testID" className="block px-2 py-1 rounded-md">
                    {/* Iterem sobre la llista de tests i mostrem les opcions */}
                    {(tests?.data as { tests: Test[] }).tests.map((test: Test) => (
                        <option key={test.id} value={test.id}>{test.name}</option>
                    ))}
                </select>
                <p className="text-gray-400 mt-2 mb-2">
                    Atenció, si elimines un test, no hi haurà manera de poder recuperar aquest
                </p>
                {/* Botó per enviar el formulari */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Eliminar Test
                </button>
            </Form>
        </div>
    );
}