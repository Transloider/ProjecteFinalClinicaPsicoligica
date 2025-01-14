import { redirect } from '@remix-run/react';
import { Client, UserAndReport } from '../types/interfaces';
import { sessionClientStorage, sessionStorage } from './auth.server';
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

export async function addClient(token: string, name: string, email: string, address:string, gender: string, born_date:string, phone:string, username: string, password:string) {
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
                phone,
                username,
                password,
            }),
        });
        if (!response.ok) {
            throw new Error("Error adding the client");
        }

        const data = await response.json();
        if(data.id == 1 || data.id == 2){
            return data.message;
        }
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

export async function login(username: string, password:string) {
    try {
        const response = await fetch('http://localhost/api/client/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        
        if (!response.ok) {
            throw new Error("Error adding the report");
        }
        const data = await response.json();
        if (data.id == 1) {
            return data.message
        }
        const client_id = data.client.id.toString();
        const redirectUrl = `/users/${client_id}`;
        console.log(data.token);
        const session = await sessionClientStorage.getSession();
        session.set("client_token", data.token); 
        session.set("client_id", client_id);
        const setCookie = await sessionClientStorage.commitSession(session);

        return redirect(redirectUrl, {
            headers: {
                "Set-Cookie": setCookie,
            },
            status: 302,
        });
    } catch (error) {
        console.log(error);
    }
}

