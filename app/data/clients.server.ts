import { Client, UserAndReport } from '../types/interfaces';
import { sessionStorage } from './auth.server';
export async function getClients(userToken: string): Promise<Client[]> {
    try {
        const response = await fetch(`http://localhost/api/clients`,{
            method: "GET",
            headers: {
              "Authorization": `Bearer ${userToken}`,
              "Content-Type": "application/json",
                }
            });
        if (!response.ok) {
            throw new Error("Error fetching clients");
        }
        const data = await response.json();
        return data.tasks;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getClient(id: string,request: Request): Promise<Client> {
    try {
        const session = await sessionStorage.getSession(request.headers.get("Cookie"));
        const token = session.get("token");
        const response = await fetch(`http://localhost/api/client/${id}`,{
            method: "GET", 
            headers: {
              "Authorization": `Bearer ${token}`,  
              "Content-Type": "application/json",  
                }
        });
        if (!response.ok) {
            throw new Error("Error fetching client");
        }
        const data = await response.json();
        return data.reports;
    } catch (error) {
        console.error(error);
        return {
            id: undefined,
            name: '',
            email: '',
            phone: '',
            address: '',
            born_date:'',
        };
    }
}

export async function getClientReports(client_id: string, request: Request): Promise<UserAndReport> {
    try {
        const session = await sessionStorage.getSession(request.headers.get("Cookie"));
        const user_id = session.get("user_id");
        const token = session.get("token");

        if (!user_id || !token) {
            throw new Error("Usuario no autenticado o sesión inválida");
        }
        const response = await fetch(`http://localhost/api/client/reports`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientID: client_id,
                userID: user_id,
            }),
        });
        
        if (!response.ok) {
            throw new Error("Error al obtener los informes del cliente");
        }
        const {reports} = await response.json();
        const reportAndClient: UserAndReport = {
            reports: reports,
        }
        return reportAndClient;
    } catch (error) {
        console.error("Error en getClientReports:", error);
        return {
            reports: [],
        };
    }
}

export async function addClient(token: string, name: string, email: string, address:string, gender: string, born_date:string, phone:string): Promise<Client> {
    try {
        const response = await fetch('http://localhost/api/client', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                address,
                gender,
                born_date,
                phone
            }),
        });
        
        if (!response.ok) {
            throw new Error("Error adding the report");
        }

        const data = await response.json();
        return data.client
    } catch (error) {
        console.log(error);
        return {
            id: undefined,
            name: "",
            email: "",
            address: "",
            born_date: "",
            phone: "",
        }
    }
}