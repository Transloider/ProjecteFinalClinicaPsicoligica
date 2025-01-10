// app/components/Calendar.tsx
import { Form, Link } from '@remix-run/react';
import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { formatToDate } from '../util/utils';

const MyCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | Date[]>(new Date());

  const handleDateChange = (newDate: Date | Date[]) => {
    setDate(newDate);
  };

  return (
    <div className='bg-white pb-4 rounded-lg'>
      <div className='flex items-center justify-center pt-2'>
        <h1 className='text-2xl'><strong>Consulta calendari</strong></h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 p-6 w-full">
        {/* Calendar Section */}
        
        <div className="flex justify-center items-center w-full sm:w-1/2 bg-white rounded-lg p-4 shadow-md">
          <ReactCalendar
            onChange={handleDateChange}
            value={date}
            className="rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center items-center w-full sm:w-1/2 bg-white rounded-lg p-6 shadow-md">

          <Form method="post" className="w-full">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Selecciona la data:
            </label>
            <div className="flex items-center gap-2">
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none text-white focus:ring-2 focus:ring-blue-400"
                type="date"
                name="date"
                value={formatToDate(date.toString())}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Consultar Dates
              </button>
            </div>
          </Form>
          <div className='flex flex-row mt-5 gap-5'>
            <Link
              to={'add'}
              className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 transition duration-300"
            >
              <i className="fa-regular fa-calendar"></i> Afegir Cita
            </Link>
            <Link
              to={'add'}
              className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 transition duration-300"
            >
              <i className="fa-solid fa-trash"></i> Eliminar Cita
            </Link>
          </div>
        </div>
      </div>
      <div className='ml-6 max-w-[36rem] p-2 rounded bg-slate-200'>
        <p>Selecciona el dia el qual vulguis consultar les teves cites i seguidament clica consultar per obtenir totes les cites que tinguis aquell dia</p>
      </div>
    </div>
  );
};

export default MyCalendar;