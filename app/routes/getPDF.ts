import { redirect, ActionFunctionArgs } from "@remix-run/node";
import { getPDF } from "../data/reports.server";

export async function action({ request }: ActionFunctionArgs) {
    if (request.method !== "POST") {
        throw new Error("Method not allowed");
    }

    const formData = await request.formData();
    const reportID = formData.get("reportID");
    const clientID = formData.get("clientID");

    try {
        await getPDF(request, reportID as string);

        return redirect(`/client/${clientID}`);
    } catch (error) {
        console.log(error);
        return redirect(`/clients/${clientID}`);
    }
}
