import { Form } from "@remix-run/react";
import {  CalendarFormProps } from "../../types/interfaces";
import { useEffect, useState } from "react";

const CalendarForm: React.FC<CalendarFormProps> = (formProps) => {
  //per fer que no puguis seleccionar apartir d'avui cap endarrere
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setToday(formattedDate);
  }, []);
  return (
    <div className="bg-white p-4 m-auto rounded shadow-md">
        <h1 className="text-2xl font-bold">Nova Cita</h1>
        <Form method="POST">
            <label htmlFor="date">Selecciona la data</label>
            <input type="date" name="date"  min={today} className="block rounded text-white"/>
            {formProps?.error?.errors?.event_date ? <p className="text-red-600"> { formProps.error.errors.event_date }</p> : ""}
            <label htmlFor="client_id">Selecciona el client</label>
            <select name="client" className="block rounded text-white">
                <option value="">Seleccionar</option>
                {formProps.clients?.length !== 0? 
                formProps.clients?.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))
              :
              <option value="">Actualment no hi han usuaris</option>}
            </select>
            {formProps?.error?.errors?.clientID ? <p className="text-red-600"> { formProps.error.errors.clientID }</p> : ""}
            <label htmlFor="title">Títol Cita</label>
            <input type="text" name="title" placeholder="xxxxxxx - 00:00" className="rounded border text-white block"/>
            {formProps?.error?.errors?.title ? <p className="text-red-600"> { formProps.error.errors.title }</p> : ""}
            <label htmlFor="summary">Breu descripció</label>
            <textarea name="summary" className="w-full p-2 rounded text-white border"/>
            {formProps?.error?.errors?.description ? <p className="text-red-600"> { formProps.error.errors.description }</p> : ""}
            <button type="submit" className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mt-2">Afegir Cita</button>
        </Form>
    </div>
  );
};

export default CalendarForm;
