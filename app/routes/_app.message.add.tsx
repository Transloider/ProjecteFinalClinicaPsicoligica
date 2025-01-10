import { useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { Client } from "../types/interfaces";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "../data/auth.server";
import { getClients } from "../data/clients.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const token = await requireUserSession(request);
    const clients = await getClients(token);
    return { clients };
  } catch (error) {
    throw new Error("Error getting clients");
  }
}

export default function ExpensesAddPage() {
  const { clients } = useLoaderData<{ clients: Client[] }>();
  const clientsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // Estado para el filtro

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mt-[5rem]">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar client..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {currentClients.map((client) => (
        <Link to={`/message/chat/${client.id}`} key={client.id}>
          <div
            className="flex justify-between items-center p-4 w-full mb-3 text-black bg-slate-100 hover:bg-gray-300 transition-colors duration-200 rounded"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                {client.name.charAt(0)}
              </div>
              <div>
                <span className="block font-bold text-lg">{client.name}</span>
              </div>
            </div>
            <button>Crear Xat</button>
          </div>
        </Link>
      ))}

      {/* Paginación */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Anterior
        </button>

        <span className="px-4 py-2 text-lg font-bold">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}