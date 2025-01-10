import { Form, Link } from "@remix-run/react";
import {  CalendarEventsProps } from "../../types/interfaces";

const CalendarEvents: React.FC<CalendarEventsProps> = (eventProps) => {
  return (
    <div className="bg-white p-4 m-auto rounded shadow-md">
        <div className="flex flex-row items-center justify-start">
            <h1 className="text-2xl font-bold">Llistat Cites</h1>
            {eventProps.events.length > 0 && (
                <p className="text-gray-600 text-2xl ml-4">
                    <i className="fa-solid fa-calendar mr-2"></i> {eventProps.events.length}
                </p>
            )}
        </div>

        
        {
            eventProps.events.length !== 0? 
            <ul className="divide-y divide-gray-300 bg-white rounded-lg shadow-md overflow-hidden">
            {eventProps.events.map((event) => (
                <li
                key={event.id}
                className="flex flex-col p-4 hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                    <div className="flex flex-row justify-between">
                        <h3 className="text-lg font-semibold text-blue-600">{event.title}</h3>
                        <Form method="POST" action="/deleteEvent">
                            <input type="hidden" name="event_id" value={event.id}/>
                            <button>
                                <i className="fa-solid fa-trash text-red-600"></i>
                            </button>
                        </Form>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-sm text-gray-500"><i className="fa-solid fa-calendar-days"></i> Data: {event.event_date}</p>
                        <Link to={`/clients/${event.client?.id}`}>
                            <i className="fa-solid fa-street-view"></i>
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500"><i className="fa-solid fa-user"></i> Client: {event.client?.name}</p>
                    <p className="text-sm text-gray-700 mt-2">Descripció: <br /> {event.description}</p>
                </li>
            ))}
            </ul>
            :
            <div>
                <p className="mb-3">No hi ha cap cita per aquesta data</p>
                <Link
                to={'add'}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    <i className="fa-regular fa-calendar"></i> Afegir Cita
                </Link>
            </div>
            
        }
    </div>
  );
};

export default CalendarEvents;
