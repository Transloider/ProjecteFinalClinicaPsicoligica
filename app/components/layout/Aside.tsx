import { Link } from "@remix-run/react";
import { useState } from "react";
import { AsideProps } from "../../types/interfaces";

const Aside: React.FC<AsideProps> = (asideProps) => {
  console.log(asideProps);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside className="bg-gray-800 p-6 h-full fixed w-1/5">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">Accions ràpides</h2>
      <ul className="space-y-4">
        <li>
          <div className="flex flex-row items-center gap-2">
            <i className="fa-solid fa-house"></i>
            <Link to={"/clients"}>
              <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="home">
                Home
              </button>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex flex-row items-center gap-2">
            <i className="fa-regular fa-user"></i>
            <Link to={"/clients/addClient"}>
              <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="add client">
                Afegir nou client
              </button>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex flex-row items-center gap-2">
            <i className="fa-solid fa-folder"></i>
            <button
              onClick={toggleDropdown}
              className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none"
              aria-label="tests dropdown"
            >
              Tests
              <i
                className={`ml-2 fa-solid ${
                  isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
                }`}
              ></i>
            </button>
          </div>
          {isDropdownOpen && (
            <ul className="mt-2 pl-6 space-y-2">
              <li>
              <div className="flex flex-row items-center gap-2">
                  <i className="fa-solid fa-plus"></i>
                  <Link to="/tests/add">
                    <button className="text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="add test">
                      Afegir
                    </button>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center gap-2">
                  <i className="fa-solid fa-pencil"></i>
                  <Link to="/tests/update">
                    <button className="text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="update test">
                      Modificar
                    </button>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center gap-2">
                  <i className="fa-solid fa-trash"></i>
                  <Link to="/tests/delete">
                    <button className="text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="eliminar test">
                      Eliminar
                    </button>
                  </Link>
                </div>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div className="flex flex-row items-center gap-2">
            <i className="fa-solid fa-calendar"></i>
            <Link to="/calendar">
              <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="calendar">
                Calendari
              </button>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex flex-row items-center gap-2">
            <i className="fa-solid fa-address-book"></i>
            <Link to="/message/users">
              <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="messages">
                Missatges
              </button>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex flex-row items-center gap-2">
            <i className="fa-solid fa-gear"></i>
            <Link to="/user/update">
              <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="user config">
                Configuració del perfil
              </button>
            </Link>
          </div>
        </li>
        {
          asideProps.isAdmin === true?   
          <>
            
            <div className="border-b pb-1">
              <p>Funcionalitats Admin</p>
            </div>
            <li>
              <div className="flex flex-row items-center gap-2">
              <i className="fa-solid fa-file-invoice"></i>
                <Link to={"/user/migrate"}>
                  <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="migrate user reports">
                    Migrar Informes
                  </button>
                </Link>
              </div>
            </li>
            <li>
            <div className="flex flex-row items-center gap-2">
              <i className="fa-duotone fa-solid fa-user-tie"></i>
              <Link to={"/clients/addUser"}>
                <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none" aria-label="add user">
                  Afegir Treballador
                </button>
              </Link>
            </div>
          </li>
          </>
          :
          null
        }
      </ul>
    </aside>
  );
};

export default Aside;
