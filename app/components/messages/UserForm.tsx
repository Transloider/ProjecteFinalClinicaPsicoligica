import { Form } from "@remix-run/react";
import { UserChatFormProps } from "../../types/interfaces";

const UserChatForm: React.FC<UserChatFormProps> = (userForm) => {
  return (
    <Form>
        <div className="bg-white p-8 rounded shadow-md">
            <h1>Selecciona el client amb qui vulguis tenir una nova conversa!</h1>
            <select name="client_id">
                <option value="">Selecciona</option>
                {userForm.clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
            </select>
        </div>
    </Form>
  );
};

export default UserChatForm;
