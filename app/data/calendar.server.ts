import { Event } from "../types/interfaces";
import { getUserForSession, getUserID } from "./auth.server";

export async function getEvents(request: Request, date: string) {
    try {
        const token = await getUserForSession(request);
        const userID = await getUserID(request);
        console.log(token);
        console.log(userID);
        const response = await fetch(`http://localhost/api/events/${userID.toString()}/${date}`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error("Error getting client test");
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function addEvent(request: Request, event: Event) {
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/events/`, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: event.title,
                description: event.description,
                event_date: event.event_date,
                client_id: event.clientID,
                user_id: event.userID,
            }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Error adding event");
        }
        const data = await response.json();
        console.log(data);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteEvent(request: Request, event_id: string) {
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/events/${event_id}`, {
            method: 'delete',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Error adding event");
        }
    } catch (error) {
        console.log(error);
    }
}