import { Message } from "../types/interfaces";
import { getClientForSession, getUserForSession } from "./auth.server";

export async function getUserMessages(request: Request, userID: string){
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/messages/${userID}/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error("Error getting message");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return []
    }
}
export async function getClientMessages(request: Request, clientID: string):  Promise<Message[]> {
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/messages/${clientID}/client`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error("Error getting message");
        }
        const data = await response.json();
        const message: Message[] = data.messages;
        return message;
    } catch (error) {
        console.log(error);
        return []
    }
}
export async function getUserChats(request: Request, userID: string){
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/messages/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error("Error getting message");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return []
    }
}
export async function getClientChats(request: Request, userID: string){
    try {
        const token = await getClientForSession(request);
        const response = await fetch(`http://localhost/api/messages/client/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error("Error getting message");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function getMessageBetweenUsers(request: Request, user_id: string, client_id: string){
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/messages/user/${user_id}/${client_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        console.log(response);
        if (!response.ok) {
            throw new Error("Error getting messages");
        }

        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.log(error);
        return []
    }
}
export async function getMessageBetweenClients(request: Request, user_id: string, client_id: string){
    try {
        const token = await getClientForSession(request);
        const response = await fetch(`http://localhost/api/messages/user/${user_id}/${client_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        console.log(response);
        if (!response.ok) {
            throw new Error("Error getting messages");
        }

        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function addUserMessage(request: Request, user_id: string, client_id: string, message: string){
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                client_id: client_id,
                message: message,
                sender_type: 'user',
            })            
        })
        if (!response.ok) {
            throw new Error("Error getting messages");
        }

        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.log(error);
        return []
    }
}
export async function addClientMessage(request: Request, user_id: string, client_id: string, message: string){
    try {
        const token = await getClientForSession(request);
        const response = await fetch(`http://localhost/api/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                client_id: client_id,
                message: message,
                sender_type: 'client',
            })            
        })
        if (!response.ok) {
            throw new Error("Error getting messages");
        }

        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.log(error);
        return []
    }
}
