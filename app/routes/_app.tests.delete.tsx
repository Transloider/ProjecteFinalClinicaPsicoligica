import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useMatches } from "@remix-run/react";
import { Test } from "../types/interfaces";
import { testRemoveValidator } from "../utils/validators";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const testID = formData.get("testID") as string;
    try {
        const {valid, errors} = testRemoveValidator(Number(testID as string));
        if (!valid) {
            return {errors}
        } else{
            //
        }
    } catch (error) {
        console.log("Error removing test", error);
    }
}

export default function DeleteTest() {
    // const actionData = useActionData<{ errors?: Record<string, string> }>();
    const matchedRoute = useMatches();
    const tests = (matchedRoute.find(
        (match) => match.id === "routes/_app.tests"
      ));
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const confirmMessage =
            "Estàs segur que vols eliminar aquest test? Aquesta acció no es pot desfer.";
        if (!window.confirm(confirmMessage)) {
            e.preventDefault(); // Cancelar el envío si el usuario no confirma
        }
    };
    return (
        <div className="bg-white p-8 rounded shadow-md">
            <Form method="post" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4 text-black">Nou Test</h1>
                <label htmlFor="test" className="text-black">Selecciona el test a eliminar</label>
                <select name="testID" className="block px-2 py-1 rounded-md">
                    {/* indiquem que el contingut de data és un array de l'interfície que hem declarat de tests */}
                    {(tests?.data as { tests: Test[] }).tests.map((test: Test) => (
                        <option key={test.id} value={test.id}>{test.name}</option>
                    ))}
                </select>
                <p className="text-gray-400 mt-2 mb-2">Atenció, si elimines un test, no hi haurà manera de poder recuperar aquest</p>
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


