import { Link } from "@remix-run/react";
import { UserClientMessages } from "../../types/interfaces";
function UsersClientList({ userClientsChat }: { userClientsChat: UserClientMessages }) {
    
    return (
    <>
        <main className="mt-[5rem]">
            <div className="flex justify-end items-center mb-2">
                <Link to={'/message/add'}>
                    <i className="fa-solid fa-user-plus text-2xl"></i>
                </Link>
            </div>
            {userClientsChat.clients.map((client) => (
                <Link to={`/message/chat/${client.id}`} key={client.id}>
                    <div 
                        className="flex justify-between items-center mb-4 p-4 w-full text-black bg-slate-100 hover:bg-gray-300 transition-colors duration-200 rounded"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                                {client.name.charAt(0)}
                            </div>
                            <div>
                                <span className="block font-bold text-lg">{client.name}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </main>
    </>
    );
}

export default UsersClientList;
