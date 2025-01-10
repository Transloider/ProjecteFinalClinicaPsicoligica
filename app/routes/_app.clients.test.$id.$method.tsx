import { LoaderFunction, ActionFunctionArgs, redirect } from "@remix-run/node";
import { getTests } from "../data/tests.server";
import { addTest, getClientTest, updateTest } from "../data/clientTest.server";
import { clientTestUpdateValidator, clientTestValidator } from "../utils/validators";
import TestForm from "../components/clientTests/TestForm";
import { ClientTest, Test } from "../types/interfaces";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request,params }) => {
    try {
        const tests = await getTests(request);
        
        const {id, method} = params;
        if (method == "add") {
            return {tests, id};
        } else if (method == "update") {
            const clientTest = await getClientTest(request,id as string)
            return {tests,clientTest};
        } else {
            throw new Error("Invalid method");
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

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
    }
    try {
        if (request.method == "POST") {
            const {valid, errors} = clientTestValidator(clientTest);
            if (!valid) {
                return {errors}
            }
            const client_id = await addTest(request, reportID as string, test_id as string, summary as string, date as string);
            return redirect(`/clients/${client_id}`);

    
        } else if(request.method == "PUT") {
            const {valid, errors} = clientTestUpdateValidator(clientTest);
            if (!valid) {
                return {errors}
            }
            const client_id = await updateTest(request,clientTestID as string, summary as string, date as string);
            return redirect(`/clients/${client_id}`);
        }
    } catch (error) {
        console.log('Error POST/PUT test', error);

    }
}

export default function TestUpdate() {
    const {tests, clientTest, id} = useLoaderData<{tests: Test[], clientTest?: Test, id?: string}>();
    const actionData = useActionData<{ errors?: Record<string, string> }>();
    const transition = useNavigation();
    const isSubmitting = transition.state === "submitting";
    return (
       <>
            <TestForm 
            tests={tests}
            testPassed={clientTest}
            error={actionData?.errors}
            report_id={id}
            isSubmitting={isSubmitting}
            />
       </>
    );
}


