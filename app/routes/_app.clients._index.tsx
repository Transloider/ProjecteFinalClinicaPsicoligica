import { Link, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import ClientListItem from "../components/clients/ClientListItem";

function ClientsList() {
  const { clients } = useOutletContext<{
    clients: Array<{ id: number; name: string; email: string; phone: string; born_date: string; address: string }>;
  }>();

  const [filter, setFilter] = useState("");

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <>
      <div className="w-5/4 items-center justify-center flex flex-col">
        <div className="bg-white p-3 rounded-b-lg flex items-center text-black w-3/4">
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
        <ol id="clients-list" className="mx-auto my-2 w-3/4">
          {filteredClients.map((client) => (
            <li key={client.id} className="my-6 flex items-baseline justify-between rounded-lg bg-white text-black">
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
