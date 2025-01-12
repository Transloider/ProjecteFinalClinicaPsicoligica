import { LoaderFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData, useNavigation } from "@remix-run/react";
import { getClient } from "../data/clients.server";
import { Client } from "../types/interfaces";
import { createReport, getReport, updateReport } from "../data/reports.server";
import { getUserForSession, getUserID } from "../data/auth.server";
import ReportForm from "../components/reports/ReportForm";

// Loader per obtenir dades de client, informe i usuari per a l'edició o creació d'informes
export const loader: LoaderFunction = async ({ params, request }) => {
    try {
        const { id, method } = params;
        let client;
        let userID;
        let token;
        let reportSummary;
        let currentID = id; // L'ID que s'assigna depèn si estem en creació o actualització

        if (id && method) { 
            if (method == "update") { // Si el mètode és 'update', recuperem un informe existent
                const report = await getReport(request, id); // Recuperem l'informe amb l'ID
                client = report.client;
                currentID = report.id;
                reportSummary = report.summary;
            } else if (method == "add") { // Si el mètode és 'add', creem un informe nou
                client = await getClient(id, request); // Recuperem el client pel seu ID
            } else {
                throw new Error("Invalid method"); // Si el mètode no és ni 'update' ni 'add', llança error
            }
            // Recuperem dades de l'usuari i la sessió
            userID = await getUserID(request); // ID de l'usuari logat
            token = await getUserForSession(request); // Token de sessió per validar l'usuari
            return { currentID, client, userID, token, method, reportSummary }; // Retornem totes les dades per utilitzar-les en el formulari
        }
        return {}; // Si no s'han trobat ID o mètode, no retornem dades
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
            return redirect(`/clients/${clientID}?message=Informe%20creat%20correctament!`);
        } else if (request.method == "PUT") {
            await updateReport(request, summary, reportID);
            return redirect(`/clients/${clientID}?message=Informe%20modificat%20correctament!`);
        }
        
    } catch (error) {
        console.log('Create report',error);
    }
}

// Component per la creació o edició d'informes
export default function CreateReport() {
    const { currentID, client, userID, token, method } = useLoaderData<{ currentID: string, client: Client, userID: string, token: string, method: string }>(); // Dades carregades al loader
    const transition = useNavigation(); // Obtenim l'estat de la navegació
    const isSubmitting = transition.state === "submitting";

    return (
        // Renderitzem el formulari amb la informació corresponent
        <ReportForm
            method={method == "add" ? "post" : "put"} // Determinem el mètode segons si estem creant o actualitzant
            client={client}
            clientID={client.id?.toString() || ""}
            reportID={currentID}
            userID={userID}
            token={token}
            isSubmitting={isSubmitting}
        />
    );
}


