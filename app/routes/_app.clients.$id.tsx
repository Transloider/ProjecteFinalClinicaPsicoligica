import { LoaderFunction } from "@remix-run/node";
import { json, Link, redirect, useLoaderData, useLocation } from "@remix-run/react";
import { getClient, getClientReports } from "../data/clients.server";
import type { Client, Report, UserAndReport } from "../types/interfaces";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { getUserID } from "../data/auth.server";
import ClientReports from "../components/reports/ClientReports";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { isNumber } from "chart.js/helpers";

// Funció loader per obtenir les dades del client i els informes
export const loader: LoaderFunction = async ({ params, request }) => {
    const { id } = params;
    if (!id) {
        throw new Error("Client ID is required");
    }
    try {
        if(!isNumber(id)){// validem que els paràmetres que es passin siguin números i no sigui text
            return redirect('/clients'); 
        }
        // Obtenim els informes del client i la informació associada
        const clientReports: UserAndReport = await getClientReports(id, request);
        const reports = clientReports.reports;
        const user_id = await getUserID(request);
        const clientInfo = await getClient(id, request);
        return json({ reports, clientInfo, user_id });
    } catch (error) {
        console.error(error);
        return json({ error: (error as Error).message }, { status: 500 });
    }
};

export default function Client() {
    const { reports, clientInfo, user_id } = useLoaderData<{ reports: Report[], clientInfo: Client, user_id: string }>();
    const [isOpen, setIsOpen] = useState(false); // Controla l'obertura del diàleg d'informació del client
    const [isOwner, setIsOwner] = useState(true); // Determina si el propietari veu tots els informes o només els seus

    // Obtenim el missatge de l'URL per mostrar-lo com a toast
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const successMessage = queryParams.get("message");
    
    // Si hi ha un missatge d'èxit, el mostrem com a notificació
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [successMessage]);

    return (
        <div>
            <div className="bg-white lg:mx-32 rounded-b-xl p-4 text-black flex justify-center items-center gap-10">
                {/* Botons per a crear un informe, mostrar la informació del client i alternar entre informes */}
                <Link to={`/clients/report/${clientInfo.id}/add`}>
                    <button aria-label="create report">
                        Crear Informe
                    </button>
                </Link>
                <button onClick={() => setIsOpen(true)} aria-label="Show user">Informacio Usuari</button>
                <button onClick={() => setIsOwner(!isOwner)} aria-label="All Reports">{isOwner ? "Tots els informes" : "Els Meus Informes"}</button>
            </div>
            <ToastContainer className="mt-[8rem]" />
            
            {/* Mostrem els informes segons si és l'usuari propietari o no */}
            {isOwner 
                ? <ClientReports reports={reports} clientInfo={clientInfo} owner={user_id} />
                : <ClientReports reports={reports} clientInfo={clientInfo} />
            }

            {/* Diàleg amb la informació del client (MODAL) */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-[1px] bg-black bg-opacity-50">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Panel className="bg-white text-black p-5 rounded-lg border-spacing-3 border-2 border-black">
                        <Dialog.Title className="font-bold text-xl">{clientInfo.name}</Dialog.Title>
                        <Dialog.Description>
                            <p>Email: {clientInfo.email}</p>
                            <p>Data Naixement: {clientInfo.born_date}</p>
                            <p>Sexe: {clientInfo.gender == "Female" ? "Femení" : clientInfo.gender == "Male" ? "Masculí" : "Other"}</p>
                        </Dialog.Description>
                        <button onClick={() => setIsOpen(false)} aria-label="close modal" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Tancar</button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
