import { Link } from "react-router-dom";
import { Client } from "../../types/interfaces";
import WorkHeader from "../navigation/WorkHeader";
import ClientListItem from "./ClientListItem";
import Aside from "../layout/Aside"; // Importa el component Aside

function ClientsList({ clients }: { clients: Client[] }) {
  return (
    <>
      <WorkHeader />
      <section className="flex">
        <div className="w-1/5 bg-gray-800">
            <Aside />  {/* Afegeix el component Aside */}
        </div>

        <main className="w-4/5 mt-[72px]">
          <ol id="clients-list" className="mx-auto my-3 w-3/4">
            {clients.map((client) => (
              <li
                key={client.id}
                className=" my-6 flex items-baseline justify-between rounded-lg bg-white text-black"
              >
                <Link
                  to={`${client.id}`} 
                  className="block w-full p-3"
                >
                  <ClientListItem
                    id={client.id}
                    name={client.name}
                    email={client.email}
                    phone={client.phone}
                    gender={client.gender}
                    born_date={client.born_date}
                    address={client.address}
                  />
                </Link>
              </li>
            ))}
          </ol>
        </main>
      </section>
    </>
  );
}

export default ClientsList;
