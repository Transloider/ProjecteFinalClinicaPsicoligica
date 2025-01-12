import { Form } from "@remix-run/react";
import { UserFormProps } from "../../types/interfaces";

const UserForm: React.FC<UserFormProps> = ({user,error, isSubmitting}) => {
    return (
        <Form method={ user?.id? "PUT" : "POST"}>
            <h1 className="text-2xl font-bold mb-4 text-black">{user? `Modifica el teu perfil ${user.name}` : "Nou Usuari"}</h1>
            <label htmlFor="name" className="block text-black mb-2">Nom</label>
            <input
                type="text"
                name="name"
                defaultValue={user?.name}
                className="border border-gray-300 rounded w-full p-2 mb-1 text-white"
                required />
            {error?.name && <p className="text-red-500 text-sm">{error?.name}</p>}

            <label htmlFor="username" className="block text-black mb-2">Nom d'usuari</label>
            <input
                type="text"
                name="username"
                defaultValue={user?.username}
                className="border border-gray-300 rounded w-full p-2 mb-1 text-white"
                required />
            {error?.username && <p className="text-red-500 text-sm ">{error?.username}</p>}

            <label htmlFor="email" className="text-black">Correu</label>
            <input className="border border-gray-300 rounded w-full p-2 mb-1 text-white" type="email" name="email" defaultValue={user?.email} required />
            {error?.email && <p className="text-red-500 text-sm">{error?.email}</p>}

            <label htmlFor="phone" className="text-black">Telèfon de contacte</label>
            <input type="text" name="phone" className="border border-gray-300 rounded w-full p-2 mb-1 text-white" defaultValue={user?.phone} required />
            {error?.phone && <p className="text-red-500 text-sm">{error?.phone}</p>}
            {
                user? <input type="hidden" name="user_id" value={user?.id}/> : null
            }
            
            {error?.server && <p className="text-red-500 text-sm">{error?.server}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`py-2 px-4 mt-3 rounded text-white ${
                    isSubmitting
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
            >
                {user? isSubmitting? "Actualitzant...": "Actualitzar" : isSubmitting? "Creant..." : "Crear"}
            </button>
        </Form>
    );
}
export default UserForm;