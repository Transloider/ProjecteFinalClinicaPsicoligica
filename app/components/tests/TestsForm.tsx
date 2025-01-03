import { Form } from "@remix-run/react";
import { TestsFormProps } from "../../types/interfaces";

const TestForm: React.FC<TestsFormProps> = ({test, error, isSubmitting}) => {
  return (
    <div className="bg-white p-8 rounded shadow-md text-black">
      <Form method={test? "PUT" : "POST"}>
        <h1 className="text-2xl font-bold mb-4 text-black">{test? "Test Seleccionat" : "Nou Test"}</h1>
        <label htmlFor="name">Nom del test</label>
        <input type="text" name="name" defaultValue={test?.name} className="block px-2 py-1 rounded-md text-white"/>
        <p className="text-red-600">{ error?.name }</p>
        <label htmlFor="description">Descripció</label>
        <textarea name="description" className="block px-2 py-1 rounded-md text-white w-full pb-3" defaultValue={test?.description}></textarea>
        <p className="text-red-600">{ error?.description }</p>
        <label htmlFor="quantity">Quantitat</label>
        <input type="text" name="quantity" defaultValue={test?.quantity} className="block px-2 py-1 rounded-md text-white"/>
        <p className="text-red-600">{ error?.quantity }</p>
        <label htmlFor="unlimited">
            {test?.unlimited === 1?
            "Quantitat test ilimitat, escriu DENEGAR, per fer-l'ho limitat"
            : 
            "Quantitat test limitat, escriu CONFIRMAR, per fer-l'ho ilimitat" }
        </label>
        <input type="text" name="unlimited" defaultValue={test?.unlimited === 1? "CONFIRMAR" : "DENEGAR"} className="block px-2 py-1 rounded-md text-white"/>
        <p className="text-red-600">{ error?.unlimited }</p>
        {test? <input type="hidden" name="testID" value={test.id} /> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-2 px-4 mt-3 rounded text-white ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {test? isSubmitting? "Modificant..." : "Modificat Test": isSubmitting? "Afegint..." : "Afegir Test"}
        </button>
      </Form>
    </div>
  );
};

export default TestForm;
