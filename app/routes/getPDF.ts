import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getPDF } from "../data/reports.server";

export async function action({ request }: ActionFunctionArgs) {
    if (request.method !== "POST") {
        throw Response.json({ message: "Method not allowed" }, { status: 405 });
        return {};
    }
    const formData = await request.formData();
    const reportID = formData.get("reportID");
    const clientID = formData.get("clientID");
    try {
        await getPDF(request, reportID as string);
    } catch (error) {
        console.log(error);
    }
    return redirect(`/clients/${clientID}`);
}