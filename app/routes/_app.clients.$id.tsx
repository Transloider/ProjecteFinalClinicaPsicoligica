import { LoaderFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { getClient, getClientReports } from "../data/clients.server";
import type { Client, Report, UserAndReport } from "../types/interfaces";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { getUserID } from "../data/auth.server";
import ClientReports from "../components/reports/ClientReports";

export const loader: LoaderFunction = async ({ params, request }) => {
    const { id } = params;
    if (!id) {
        throw new Error("Client ID is required");
    }
    try {
        const clientReports: UserAndReport = await getClientReports(id, request);
        const reports = clientReports.reports;
        const user_id = await getUserID(request);
        const clientInfo = await getClient(id, request);
        return json({ reports, clientInfo, user_id});
    } catch (error) {
        console.error(error);
        return json({ error: (error as Error).message }, { status: 500 });
    }
};

export default function Client() {
    const { reports, clientInfo, user_id} = useLoaderData<{ reports: Report[], clientInfo: Client, user_id: string}>();
    const [isOpen, setIsOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(true);
    return (
        <div>
            <div className="bg-white lg:mx-32 rounded-b-xl p-4 text-black flex justify-center items-center gap-10">
                <Link to={`/clients/report/${clientInfo.id}/add`}>
                    <button>
                        Crear Informe
                    </button>
                </Link>
                <button onClick={() => setIsOpen(true)}>Informacio Usuari</button>
                <button onClick={() => setIsOwner(!isOwner)}>{isOwner == true? "Tots els informes" : "Els Meus Informes"}</button>
            </div>

            {isOwner? <ClientReports 
            reports={reports} 
            clientInfo={clientInfo} 
            owner={user_id}/>
            : 
            <ClientReports 
            reports={reports} 
            clientInfo={clientInfo}/>
            }
            
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-[1px] bg-black bg-opacity-50">
                <div className="flex items-center justify-center min-h-screen ">
                <Dialog.Panel className="bg-white text-black p-5 rounded-lg border-spacing-3  border-2 border-black">
                    <Dialog.Title className="font-bold text-xl">{clientInfo.name}</Dialog.Title>
                    <Dialog.Description>
                        <p>Email: {clientInfo.email}</p>
                        <p>Data Naixement: {clientInfo.born_date}</p>
                        <p>Sexe: {clientInfo.gender == "Female"? "Femení": clientInfo.gender == "Male"? "Masculí": "Other"}</p>
                    </Dialog.Description>
                    <button onClick={() => setIsOpen(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Tancar</button>
                </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
