import { Form, useMatches } from "@remix-run/react";
import { ReportFormProps } from "../../types/interfaces";

const ReportForm: React.FC<ReportFormProps> = (reportForm) => {
    const matches = useMatches();
    const matchedRoute = matches.find((match) => match.id === "routes/_app.clients.report.$id.$mode");
    console.log(matchedRoute);
    let summary;
    if (matchedRoute?.params?.mode === "update") {
      summary = matchedRoute?.data?.reportSummary;
    }

    return (
      <div className="bg-white p-8 rounded shadow-md text-black">
        <Form method={reportForm.method}>
          <h1 className="text-2xl font-bold mb-4 text-black">{reportForm.method == "post"? "Nou Report": "Modificar Report"}</h1>
          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-xl font-bold">{reportForm.client?.name}</p>
            <p>Email: {reportForm.client?.email}</p>
            <p>Sexe: {reportForm.client?.gender === "Male" ? "Masculí" : reportForm.client?.gender === "Female" ? "Femení" : "Altres"}</p>
            <p>Data neixament: {reportForm.client?.born_date}</p>
          </div>
          <label htmlFor="summary" className="block text-black mb-2 mt-2">
            Resum
          </label>
          <textarea
            id="summary"
            name="summary"
            defaultValue={summary? summary : undefined}
            className="border border-gray-300 rounded w-full p-2 mb-1 pb-16 text-white"
          >
            
          </textarea>
          <p className="text-gray-700 mb-4">
          {reportForm.method=="post"? 
          "En crear un informe, quedarà com l’últim del client, i des d’allí podràs crear un test vinculat."
          :
          ""
          }
            
          </p>
          <input type="hidden" name="clientID" value={reportForm?.clientID} />
          <input type="hidden" name="userID" value={reportForm?.userID} />
          <input type="hidden" name="reportID" value={reportForm?.reportID} />
          <input type="hidden" name="token" value={reportForm?.token} />
          <button
            type="submit"
            disabled={reportForm.isSubmitting}
            className={`py-2 px-4 mt-3 rounded text-white ${
              reportForm.isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {reportForm.method=="post"? reportForm.isSubmitting? "Creant..." : "Crear Report" : reportForm.isSubmitting? "Actualitzant..." : "Actualitzar Report" }
          </button>
        </Form>
      </div>
    );
  };
export default ReportForm;