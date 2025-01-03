import { Test } from "~/types/interfaces";
import { getUserForSession } from "./auth.server";

export async function getTests(request: Request){
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/tests`,{
            method: "GET", 
            headers: {
                "Authorization": `Bearer ${token}`,  
                "Content-Type": "application/json",  
            }
        });
        if (!response.ok) {
            throw new Error("Error getting tests");
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeTest(request: Request, testID: string){
    try {
        const token = getUserForSession(request);
        const response = await fetch(`http://localhost/api/tests/${testID}`,{
            method: "delete", 
            headers: {
                "Authorization": `Bearer ${token}`,  
                "Content-Type": "application/json",  
            }
        });
        if (!response.ok) {
            throw new Error("Error getting tests");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateTest(request: Request, test: Test){
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/tests/${test.id}`,{
            method: "PUT", 
            headers: {
                "Authorization": `Bearer ${token}`,  
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(
                {
                    name: test.name,
                    summary: test.description,
                    quantity: test.quantity,
                    unlimited: test.unlimited
                }
            )
        });
        if (!response.ok) {
            throw new Error("Error getting tests");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function addTest(request: Request, test: Test){
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/tests/`,{
            method: "POST", 
            headers: {
                "Authorization": `Bearer ${token}`,  
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(
                {
                    name: test.name,
                    summary: test.description,
                    quantity: test.quantity,
                    unlimited: test.unlimited
                }
            )
        });
        const data = await response.json();
        if (data.id === 1) {
            return data.message;
        } else if (!response.ok) {
            throw new Error("Error getting tests");
        }
    } catch (error) {
        console.log(error);
    }
}