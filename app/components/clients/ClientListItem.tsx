import { Client } from "../../types/interfaces";


function ClientListItem({name, email, phone, born_date,address}: Client) {
  return (
    <div className="flex w-full items-center justify-between p-7">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <i className="fa-regular fa-user"></i>
            <h2 className="text-xl font-bold">{name}</h2>
          </div>
          <p className="text-lg">Correu: {email}</p>
          <p className="text-lg">Contacte: {phone}</p>
          <p className="text-lg">Neixament: {born_date}</p>
          <p className="text-lg">Adreça: {address}</p>
        </div>
    </div>
  );
}

export default ClientListItem;
