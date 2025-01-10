import { getUserForSession } from "./auth.server";

export async function addTest(request: Request ,report_id: string, test_id: string, test_summary: string, test_date: string) {
    try {
        const token = await getUserForSession(request);
        const response = await fetch('http://localhost/api/clientTests', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                report_id: report_id,
                test_id: test_id,
                test_summary:test_summary,
                test_date: test_date
            }),
        });
        if (!response.ok) {
            throw new Error("Error adding the report");
        }
        const data = await response.json();
        return data.client_id;
    } catch (error) {
        console.log(error);
    }
}

export async function getClientTest(request: Request, clientTestID: string) {
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/clientTests/${clientTestID}`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error("Error getting client test");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateTest(request: Request,clientTestID: string, summary: string, date: string) {
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/clientTests/${clientTestID}`, {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                test_summary: summary,
                test_date: date,
            }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Error update client test");
        }
        
        const data = await response.json();
        console.log(data);
        return data.client_id;
    } catch (error) {
        console.log(error);
    }
}