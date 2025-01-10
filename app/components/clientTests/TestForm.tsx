import { Form } from "@remix-run/react";
import { useState } from "react";
import { TestFormProps, Test } from "../../types/interfaces";

const ReportForm: React.FC<TestFormProps> = ({ tests, testPassed, error, report_id, isSubmitting}: TestFormProps) => {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const handleTestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const testId = event.target.value;
    const test = tests.find((t) => t.id == Number(testId)) || null;
    setSelectedTest(test);
  };
  return (
    <div className="bg-white p-8 rounded shadow-md">
      <Form method={testPassed? "PUT" : "POST"}>
        <h1 className="text-2xl font-bold mb-4 text-black">{testPassed? "Modificar Test" : "Nou Test"}</h1>
        {selectedTest && (
        <div className="mb-4 p-4 bg-gray-100 rounded-md text-black">
          <h2 className="text-lg font-bold">Informació del Test Seleccionat:</h2>
          <p><strong>Nom:</strong> {selectedTest.name}</p>
          <p><strong>Descripció:</strong> {selectedTest.description}</p>
        </div>
        )}
        {
          testPassed? 
          <div className="mb-4 p-4 bg-gray-100 rounded-md text-black">
            <h2 className="text-lg font-bold">Test Actual</h2>
            <p><strong>Data:</strong> {testPassed.test_date}</p>
            <p><strong>Descripció:</strong> {testPassed.result}</p>
          </div> : ""
        }
      {
        testPassed? "" :         
        <>
          <label htmlFor="test" className="text-black">Selecciona el test a eliminar</label>
          <select
            name="testID"
            id="test_id"
            className="block px-2 py-1 rounded-md"
            onChange={handleTestChange}
          >
            <option value="select">Selecciona</option>
            {tests
              .filter((test: Test) => test.quantity > 0)
              .map((test: Test) => (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              ))}
          </select>
        </>
      }
        <label htmlFor="test_date" className="text-black mt-1">Insereix la data</label>
        <input type="date" name="test_date" className="block px-2 py-1 rounded-md" 
          defaultValue={testPassed? testPassed.test_date : ""}/>
        <label htmlFor="summary" className="text-black mt-1">Resultats Test</label>
        <textarea name="summary" defaultValue={testPassed? testPassed.result : ""} required className="block px-2 py-1 rounded-md w-full">
        </textarea>
        <p className="text-red-600">{error?.test_id? error?.test_id : ""}</p>

        {
          testPassed? <input type="hidden" name="clientTestID" value={testPassed.id}/> : ""
        }
        {
          report_id? <input type="hidden" name="reportID" value={report_id}/> : ""
        }
        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-2 px-4 mt-3 rounded text-white ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {testPassed? isSubmitting? "Modificant..." : "Modificat Test": isSubmitting? "Afegint..." : "Afegir Test"}
        </button>
      </Form>
    </div>
  );
};

export default ReportForm;
