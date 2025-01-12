import { Link, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import ClientListItem from "../components/clients/ClientListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Client } from "../types/interfaces";

function ClientsList() {
  // Obtenim dades del context: llista de clients i missatge d'èxit
  const contextData = useOutletContext<{
    clients: Client[];
    successMessage?: string;
  }>();
  const [filter, setFilter] = useState("");

  // Filtra els clients segons el text introduït
  const filteredClients = Array.isArray(contextData.clients)
    ? contextData.clients.filter((client) =>
        client.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    : [];

  // Mostra una notificació si hi ha un missatge d'èxit
  useEffect(() => {
    if (contextData.successMessage) {
      toast.success(contextData.successMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [contextData.successMessage]);

  return (
    <>
      <div className="w-5/4 items-center justify-center flex flex-col">
        {/* Barra de filtratge */}
        <div className="bg-white p-3 rounded-b-lg flex items-center text-black w-3/4">
          {/* Notificació dels missatges */}
          <ToastContainer className="mt-4" />
          
          <div className="mr-3 flex items-center">
            <i className="fa-regular fa-user"></i>
            <span className="ml-1">{filteredClients.length}</span>
          </div>
          <div className="flex flex-row items-center border border-gray-600 rounded-md p-2 w-full">
            <i className="fa-solid fa-magnifying-glass mr-2"></i>
            <input
              type="text"
              name="filter"
              className="bg-white outline-none border-l border-black pl-2 w-full"
              placeholder="Filtrar client"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        {/* Llista de clients */}
        <ol id="clients-list" className="mx-auto my-2 w-3/4">
          {filteredClients.map((client) => (
            <li
              key={client.id}
              className="my-6 flex items-baseline justify-between rounded-lg bg-white text-black"
            >
              <Link to={`${client.id}`} className="block w-full p-3">
                <ClientListItem
                  id={client.id}
                  name={client.name}
                  email={client.email}
                  phone={client.phone}
                  born_date={client.born_date}
                  address={client.address}
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default ClientsList;
