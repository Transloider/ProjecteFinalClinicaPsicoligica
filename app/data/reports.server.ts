import { getUserForSession, getUserID, sessionStorage } from "./auth.server";

export async function createReport(summary :string, clientID: string, userID:string , token: string) {
    try {
        console.log('id client', clientID);
        const response = await fetch('http://localhost/api/reports/', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            summary,
            clientID,
            userID,
            }),
        });
        
        if (!response.ok) {
            console.log(response);
            throw new Error('Error creating report');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getReport(request: Request, reportID: string) {
    try {
        const session = await sessionStorage.getSession(request.headers.get("Cookie"));
        const token = session.get("token");
        const response = await fetch(`http://localhost/api/reports/${reportID}`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error("Error getting report");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}
export async function updateReport(request: Request, summary: string, report_id: string) {
    try {
        const session = await sessionStorage.getSession(request.headers.get("Cookie"));
        const token = session.get("token");
        console.log('report', report_id);
        
        const response = await fetch(`http://localhost/api/reports/${report_id}`, {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "summary": summary,
            }),
        });
        
        if (!response.ok) {
            console.log(response);
            throw new Error('Error updating report');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteReport(request: Request, reportID: string) {
    try {
        const session = await sessionStorage.getSession(request.headers.get("Cookie"));
        const token = session.get("token");
        const response = await fetch(`http://localhost/api/reports/${reportID}`, {
            method: 'delete',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error("Error getting report");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getPDF(request: Request, reportID: string) {
    try {
        const user_id = await getUserID(request);
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/report/pdf/${reportID}/${user_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error("Error getting report");
        }
    } catch (error) {
        console.log(error);
    }
}