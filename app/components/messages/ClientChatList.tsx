import { Form, Link } from "@remix-run/react";
import { ClientUserMessages } from "../../types/interfaces";
function UsersClientList({ userClientsChat }: { userClientsChat: ClientUserMessages }) {
    
    return (
    <>
        <main className="px-[5rem] pt-[4rem]">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl mb-4">Missatges - {userClientsChat.client.name}</h1>
                <Form method="POST" action="/clientLogout">
                    <button>
                        <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                    </button>
                </Form>
            </div>
            <div>
                {userClientsChat.users.map((user) => (
                    <Link to={`/chat/${user.id}`} key={user.id}>
                        <div 
                            className="flex justify-between items-center mb-4 p-4 w-full text-black bg-slate-100 hover:bg-gray-300 transition-colors duration-200 rounded"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <span className="block font-bold text-lg">{user.name}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            {userClientsChat.users.length === 0 && (
                <div className="text-center text-gray-500 mt-4">
                    <hr />
                    <p className="mt-4">Actualment no tens cap xat amb cap treballador. Espera a que contacti amb tu.</p>
                </div>
            )}
            </div>
        </main>
    </>
    );
}

export default UsersClientList;
