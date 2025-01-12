import { LoaderFunction, ActionFunctionArgs, redirect } from "@remix-run/node";
import { getTests } from "../data/tests.server";
import { addTest, getClientTest, updateTest } from "../data/clientTest.server";
import { clientTestUpdateValidator, clientTestValidator } from "../utils/validators";
import TestForm from "../components/clientTests/TestForm";
import { ClientTest, Test } from "../types/interfaces";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";

// Funció que es carrega abans de renderitzar la pàgina
export const loader: LoaderFunction = async ({ request, params }) => {
    try {
        // Obtenim els tests disponibles
        const tests = await getTests(request);
        
        const {id, method} = params;
        if (method == "add") {
            // Si el mètode és 'add', retornem la informació necessària per afegir un test
            return {tests, id};
        } else if (method == "update") {
            // Si el mètode és 'update', obtenim les dades del test del client per actualitzar-lo
            const clientTest = await getClientTest(request, id as string);
            return {tests, clientTest};
        } else {
            throw new Error("Mètode invàlid"); // Error si el mètode no és 'add' ni 'update'
        }
    } catch (error) {
        console.log(error);
        return null; // Retornem null en cas d'error
    }
};

// Funció per gestionar les accions POST i PUT
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const summary = formData.get("summary") as string;
    const date = formData.get("test_date") as string;
    const test_id = formData.get("testID")  as string;
    const reportID = formData.get("reportID")  as string;
    const clientTestID = formData.get("clientTestID")  as string;
    
    const clientTest: ClientTest = {
        report_id: reportID,
        test_id: test_id,
        result: summary,
        test_date: date,
    };

    try {
        if (request.method == "POST") {
            // Validació del test abans de guardar-lo
            const {valid, errors} = clientTestValidator(clientTest);
            if (!valid) {
                return {errors}; // Retornem els errors si la validació falla
            }
            const client_id = await addTest(request, reportID as string, test_id as string, summary as string, date as string);
            return redirect(`/clients/${client_id}?message=Test%20associat%20correctament!`);
        } else if(request.method == "PUT") {
            // Validació per actualitzar el test
            const {valid, errors} = clientTestUpdateValidator(clientTest);
            if (!valid) {
                return {errors}; // Retornem els errors si la validació falla
            }
            const client_id = await updateTest(request, clientTestID as string, summary as string, date as string);
            return redirect(`/clients/${client_id}?message=Test%20del%20client%20modificat%20correctament!`);
        }
    } catch (error) {
        console.log('Error POST/PUT test', error); // Gestió d'errors en cas de fallida
    }
}

// Component principal per a la vista d'actualització del test
export default function TestUpdate() {
    const { tests, clientTest, id } = useLoaderData<{ tests: Test[], clientTest?: Test, id?: string }>();
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    const transition = useNavigation();
    const isSubmitting = transition.state === "submitting"; // Comprovem si el formulari s'està enviant
    return (
       <>
            <TestForm 
            tests={tests} // Llista de tests
            testPassed={clientTest} // Test actual (si existeix)
            error={actionData?.errors} // Errors de validació
            report_id={id} // ID del report
            isSubmitting={isSubmitting} // Estat d'enviament del formulari
            />
       </>
    );
}
