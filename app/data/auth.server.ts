import { redirect } from "@remix-run/react";
import { SignupInput } from "../types/interfaces";
import { createCookieSessionStorage } from "@remix-run/node";

export async function login({ email, password }: SignupInput) {
    const response = await fetch("http://localhost/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        console.error("Login failed:", response.status, await response.text());
        throw new Error("Invalid credentials");
    }

    const data = await response.json();
    if (!data.token) {
        throw new Error("Missing token in the response");
    }

    const session = await sessionStorage.getSession();
    session.set("token", data.token);
    session.set("user_id", data.user_id);
    const setCookie = await sessionStorage.commitSession(session);
    return redirect("/clients", {
        headers: {
            "Set-Cookie": setCookie,
        },
        status: 302,
    });
}

export async function requireUserSession(request: Request) {
    const userId = await getUserForSession(request);
    if (!userId) {
      // Si no hi ha cap identificador d'usuari, redirigim a la pàgina d'autenticació
      throw redirect("/auth");
    }
    return userId;
}

export async function getUserForSession(request: Request) {
    try {
        const session = await sessionStorage.getSession(
          request.headers.get("Cookie"),
        );

        const token = session.get("token") as string;
        if (!token) {
          return null;
        }else {
          return token;
        }
    } catch (error) {
        console.log(error);
    }
}
export async function getUserID(request: Request){
    try {
        const session = await sessionStorage.getSession(
          request.headers.get("Cookie"),
        );

        const user_id = session.get("user_id") as string;
        if (!user_id) {
          return null;
        }else {
          return user_id;
        }
    } catch (error) {
        console.log(error);
    }
}
//FUNCIONALITAT COOKIES

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "token",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, 
    path: "/",
  },
});

export async function destroyUserSession(request: Request) {
    const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
    );
    return redirect("/", {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
        },
    });
}
// export async function signup({ email, password }: SignupInput) {
//     // 1. Comprovar si l'usuari ja existeix a la taula 'users'

//     // 2. Si no existeix, crear un nou usuari amb la contrasenya xifrada

//     // const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
//    return redirect("/");
// }