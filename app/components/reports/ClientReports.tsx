import { Form, Link } from "@remix-run/react";
import { ClientReportsProps, Report } from "../../types/interfaces";

const ClientReports: React.FC<ClientReportsProps> = ({ reports, clientInfo, owner }) => {
    let comptador = 1;
    let filteredReports;
    //si es passa l'owner es filtra, en cas contrari simplement es llisten tots
    if (owner) {
        filteredReports = reports?.filter((report: Report) => report.user_id == Number(owner));
    } else {
        filteredReports = reports;
    }

    return (
        <>
        {owner?
            ""
            :
            <div className="flex flex-col justify-center items-center bg-gray-100 p-4 my-4 text-black rounded-md">
                <p className="text-xl">Mode Lectura <i className="fa-solid fa-eye"></i></p>
            </div>
        }
        {filteredReports && filteredReports.length > 0 ? (
        filteredReports.map((report: Report) => (
            <div key={report.id} className="bg-gray-100 p-4 my-4 text-black rounded-md">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Informe: {comptador++}</h3>
                    {owner?         
                    <div className="flex flex-row items-center gap-3">
                        <Form action="/getPDF" method="post">
                            <input type="hidden" name="reportID" value={report.id}/>
                            <input type="hidden" name="clientID" value={clientInfo.id}/>
                            <button type="submit">
                                <i className="fa-solid fa-file-pdf"></i>
                            </button>
                        </Form>
                        <Link to={`/clients/report/${report.id}/update`}>
                            <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <Form action="/deleteReport" method="post">
                            <input type="hidden" name="reportID" value={report.id}/>
                            <input type="hidden" name="clientID" value={clientInfo.id}/>
                            <button type="submit">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </Form>
                    </div> 
                    :
                    ""}
                </div>

                <p><strong>Responsable:</strong> {report.user}</p>
                <p><strong>Data informe:</strong> {report.report_date}</p>
                <p><strong>Resum Informe:</strong> {report.summary}</p>

                {report.tests && report.tests.length > 0 ? (
                <div className="p-3 mt-4 rounded-md">
                <h4 className="text-lg font-medium">Tests:</h4>
                    <ul className="ml-2">
                        {report.tests.map((test, index) => (
                            <li key={index} className="mt-2 bg-gray-200 p-4 rounded">
                                <div className="flex justify-between items-center">
                                    <p><strong>Test: </strong> {test.name}</p>
                                    {owner? 
                                        <Link
                                        to={`/clients/test/${test.pivot.id}/update`}
                                        >
                                            <i className="fa-solid fa-pencil ml-2 cursor-pointer"></i>
                                        </Link> : ""
                                    }
                                </div>
                                <strong>Descripció:</strong> {test.description} <br />
                                <strong>Data:</strong> {test.pivot.test_date} <br />
                                <strong>Resultat:</strong> {test.pivot.result}
                            </li>
                        ))}
                    </ul>
                </div>
     
                ) : (
                    <p className="mt-4">No hi ha tests associats a aquest informe.</p>
                )}
                {
                    owner?
                    <Link to={`/clients/test/${report.id}/add`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4">
                            Afegir Test
                        </button>
                    </Link>
                    :
                    ""
                }
            </div>
        ))
    ) : (
        owner? 
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 my-4 text-black rounded-md">
            <p className="text-xl">Aquest client actualment no té cap informe</p>
            <Link to={`/clients/report/${clientInfo.id}/add`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Crear Informe
                </button>
            </Link>
        </div>
        :
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 my-4 text-black rounded-md">
            <p className="text-xl">Aquest client no té cap altre Informe</p>
            <Link to={`/clients/report/${clientInfo.id}/add`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Crear Informe
                </button>
            </Link>
        </div>
    )}
        </>
    );
}

export default ClientReports;
