import { Form } from "@remix-run/react";
import { UserMigrationFormProps } from "../../types/interfaces";

const UserMigrationForm: React.FC<UserMigrationFormProps> = (migrationProps) => {
    return (
        <Form method="PUT">
            <div className="text-black">
                <h1 className="text-2xl font-bold">Migració d&apos;informes</h1>
                <p className=" text-gray-700 leading-6 text-justify">
                    Selecciona, en primer lloc, el client del qual es desitja migrar tots els informes. 
                    Tot seguit, selecciona el client al qual es volen assignar aquests informes. 
                    Cal tenir en compte que <strong className="text-red-500">aquest canvi és irreversible</strong>, 
                    de manera que és important assegurar-se abans de confirmar l&apos;acció.
                </p>
                <div className="flex flex-row justify-center gap-10 mt-8">
                    <div>
                        <label htmlFor="oldUserId">Usuari Antic</label>
                        <select
                            name="oldUserId"
                            id="oldUserId"
                            className="text-white block max-w-44 rounded"
                        >
                            <option value="">Selecciona</option>
                            {migrationProps.users?.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.username})
                                </option>
                            ))}
                        </select>
                        {
                            migrationProps.error?.errors?.oldUser && <p className="text-red-600">{migrationProps.error?.errors?.oldUser}</p>
                        }
                    </div>
                    <div className="flex items-center">
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                    <div className="">
                        <label htmlFor="newUserId">Usuari Actual</label>
                        <select
                            name="newUserId"
                            id="newUserId"
                            className="text-white block max-w-44 rounded"
                        >
                            <option value="">Selecciona</option>
                            {migrationProps.users?.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.username})
                                </option>
                            ))}
                        </select>
                        {
                            migrationProps.error?.errors?.newUser && <p className="text-red-600">{migrationProps.error?.errors?.newUser}</p>
                        }
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    {
                        migrationProps.error?.errors?.equalUsers && <p className="text-red-600">{migrationProps.error?.errors?.equalUsers}</p>
                    }
                </div>
                <button 
                    type="submit" 
                    disabled={migrationProps.isSubmitting}
                    className={`py-2 px-4 mt-3 rounded text-white ${
                        migrationProps.isSubmitting
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                >
                    {migrationProps.isSubmitting ? "Migrant..." : "Migrar"}
                </button>
            </div>
        </Form>
    );
}

export default UserMigrationForm;
