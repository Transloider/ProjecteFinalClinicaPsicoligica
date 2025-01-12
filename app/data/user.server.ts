import { Migration, User } from "../types/interfaces";
import { getUserForSession } from "./auth.server";
export async function getUsers(request: Request): Promise<User[]> {
    const token = await getUserForSession(request);
    const response = await fetch(`http://localhost/api/users/`,{
        method: "GET", 
        headers: {
            "Authorization": `Bearer ${token}`,  
            "Content-Type": "application/json",  
        }
    });
    if (!response.ok) {
        throw new Error("Error getting user");
    }
    const data = await response.json();
    return data.data;
}
export async function getUser(request: Request, user_id: string): Promise<User> {
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/users/${user_id}`,{
            method: "GET", 
            headers: {
                "Authorization": `Bearer ${token}`,  
                "Content-Type": "application/json",  
            }
        });
        if (!response.ok) {
            throw new Error("Error getting user");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log("Error getting user", error);
        return {
            name: "",
            username: "",
            email: "",
            phone: "",
            admin: "",
        }
    }
}

export async function addUser(request: Request, user: User) {
    try {
        const token = await getUserForSession(request);
        const response = await fetch("http://localhost/api/users", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                password: user.password
            }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Error adding user");
        }
        const data = await response.json();
        if (data.id == 1 || data.id == 2) {
            return data.message
        }
        return data.data;
    } catch (error) {
        console.log("Error adding user", error);
        return {
            name: "",
            username: "",
            email: "",
            phone: "",
            admin: "",
        };
    }
}

export async function updateUser(request: Request, user: User) {
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
            }),
        });
        if (!response.ok) {
            throw new Error("Error updating user");            
        }
        const data = await response.json();
        if (data.id == 1 || data.id == 2) {
            return data.message;
        }
    } catch (error) {
        console.log("Error updating user", error);
    }
}

export async function migrateUsersReports(request: Request, migration: Migration) {
    try {
        const token = await getUserForSession(request);
        const response = await fetch(`http://localhost/api/user/migration`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newUser: migration.newUser,
                oldUser: migration.oldUser,
            }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Error updating user");            
        }
        console.log(await response.json());
    } catch (error) {
        console.log("Error updating user", error);
    }
}