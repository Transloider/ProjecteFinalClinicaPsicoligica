import { LoaderFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData, useNavigation } from "@remix-run/react";
import { getClient } from "../data/clients.server";
import { Client } from "../types/interfaces";
import { createReport, getReport, updateReport } from "../data/reports.server";
import { getUserForSession, getUserID } from "../data/auth.server";
import ReportForm from "../components/reports/ReportForm";

export const loader: LoaderFunction = async ({ params,request }) => {
    try {
        const { id, method } = params;
        let client;
        let userID;
        let token;
        let reportSummary;
        // En cas que sigui add s'afegirà l'ide del navegador que és la del client en  cas contrari 
        // s'assigna la del condicional ja que en l'update per paràmetres va el report_id
        let currentID = id;
        if (id && method) {
            
            if (method == "update") {
                const report = await getReport(request,id);
                client = report.client;
                currentID = report.id;
                reportSummary = report.summary
            } else if (method == "add") {
                client = await getClient(id,request);
            } else{
                throw new Error("Invalid method");
            }
            userID = await getUserID(request);
            token = await getUserForSession(request);
            return {currentID, client, userID, token, method, reportSummary}
        }
        return {};
    } catch (error) {
        console.log(error);
        return null;
    }
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const summary = formData.get("summary")  as string;
    const clientID = formData.get("clientID")  as string;
    const userID = formData.get("userID")  as string;
    const reportID = formData.get("reportID")  as string;
    const token = formData.get("token")  as string;
    if (!summary) {
        return { error: "Summary is required" };
    }
    if (!clientID) {
        return { error: "ClientID is required" };
    }
    if (!userID) {
        return { error: "UserID is required" };
    }
    if (!token) {
        return {error: "Token is required"};
    }

    //recuperem els id's amb string i fem el 
    try {
        if (request.method == "POST") {
            await createReport(summary, clientID, userID, token);
        } else if (request.method == "PUT") {
            await updateReport(request, summary, reportID);
        }
        
    } catch (error) {
        console.log('Create report',error);
    }

    return redirect(`/clients/${clientID}`);
}

export default function CreateReport() {
    const { currentID, client, userID, token,method } = useLoaderData<{ currentID: string, client: Client, userID: string, token: string, method:string }>();
    const transition = useNavigation();
    const isSubmitting = transition.state === "submitting";
    return (
        <ReportForm
            method={method=="add"? "post": "put"}
            client={client}
            clientID={client.id?.toString() || ""}
            reportID={currentID}
            userID={userID}
            token={token}
            isSubmitting={isSubmitting}
        />
    );
}


