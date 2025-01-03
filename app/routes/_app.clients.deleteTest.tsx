import { LoaderFunction, ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { getTests } from "../data/tests.server";
import { Test, ClientTest } from "../types/interfaces";
import { addTest } from "../data/clientTest.server";
import { clientTestValidator } from "../utils/validators";

export const loader: LoaderFunction = async ({ request }) => {
    try {
        const tests = await getTests(request);
        return {tests};
    } catch (error) {
        console.log(error);
        return null;
    }
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const summary = formData.get("summary") as string;
    const test_id = formData.get("test")  as string;
    const date = formData.get("testDate")  as string;
    const reportID = formData.get("reportID")  as string;
    const token = formData.get("token")  as string;
    const clientID = formData.get("clientID")  as string;
    const clientTest: ClientTest = {
        report_id: reportID,
        test_id: test_id,
        result: summary,
        test_date: date,
    }
    
    const {valid, errors} = clientTestValidator(clientTest);
    if (!valid) {
        return {errors}
    }

    try {
       await addTest(reportID as string, test_id as string, summary as string, date as string, token as string);
    } catch (error) {
        console.log('Create report',error);
    }
    return redirect(`/clients/${clientID}`);
}

export default function DeleteTest() {
    const { tests } = useLoaderData<{tests: Test[]}>();
    // const actionData = useActionData<{ errors?: Record<string, string> }>();
    return (
        <div className="bg-white p-8 rounded shadow-md">
            <Form method="post">
                <h1 className="text-2xl font-bold mb-4 text-black">Nou Test</h1>
                <label htmlFor="test" className="text-black">Selecciona el test a eliminar</label>
                <select name="testID" className="block px-2 py-1 rounded-md">
                    {
                        tests.map( test => (
                            <option key={test.id} value={test.id}>{test.name}</option>
                        ))
                    }
                </select>
                <p className="text-gray-400 mt-2 mb-2">Atenció, si elimines un test, no hi haurà manera de poder recuperar aquest</p>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Eliminar Test
                </button>
            </Form>
        </div>
    );
}


