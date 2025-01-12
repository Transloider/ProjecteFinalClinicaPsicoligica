import { Form } from "@remix-run/react"
import React from "react";
interface AuthPageProps {
    error?: string;
}
const ClientForm: React.FC<AuthPageProps> = (formProps) => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Form
                method="POST"
                className="flex flex-col rounded-lg bg-gray-100 p-6 shadow-md w-full max-w-md"
                id="client-form"
            >
                <h1 className="text-xl text-black font-bold text-center">Login Treballadors</h1>
                <label htmlFor="username" className="text-lg text-black font-semibold">
                    Email/Username
                </label>
                <input
                    type="text"
                    name="user"
                    id="user"
                    className="rounded-lg border border-gray-300 p-2"
                />
                <label htmlFor="password" className="text-lg text-black font-semibold">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="rounded-lg border border-gray-300 p-2"
                />
                {formProps.error ? <p className="text-red-600">{formProps.error}</p> : null}
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-lg p-2 mt-4"
                >
                    Iniciar Sessió
                </button>
            </Form>
        </div>
    )
}

export default ClientForm;
