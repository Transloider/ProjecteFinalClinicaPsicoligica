import { Form, Link } from "@remix-run/react"
import React from "react";

const ClientForm: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Form
                method="POST"
                className="flex flex-col rounded-lg bg-gray-100 p-6 shadow-md w-full max-w-md"
                id="client-form"
            >
                <h1 className="text-xl text-black font-bold text-center">Login</h1>
                <label htmlFor="email" className="text-lg text-black font-semibold">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-lg p-2 mt-4"
                >
                    Iniciar Sessió
                </button>
                <Link
                    to="/signup"
                    className="text-blue-500 text-lg font-semibold mt-4 text-center"
                >
                    No tens un compte? Registrar
                </Link>
            </Form>
        </div>
    )
}

export default ClientForm;
