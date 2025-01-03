import { Link } from "@remix-run/react";
import { useState } from "react";

const Aside = () => {
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
              <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none">
                Home
              </button>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex flex-row items-center gap-2">
            <i className="fa-regular fa-user"></i>
            <Link to={"/clients/addClient"}>
              <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none">
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
                    <button className="text-gray-300 hover:text-gray-100 focus:outline-none">
                      Afegir
                    </button>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center gap-2">
                  <i className="fa-solid fa-pencil"></i>
                  <Link to="/tests/update">
                    <button className="text-gray-300 hover:text-gray-100 focus:outline-none">
                      Modificar
                    </button>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center gap-2">
                  <i className="fa-solid fa-trash"></i>
                  <Link to="/tests/delete">
                    <button className="text-gray-300 hover:text-gray-100 focus:outline-none">
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
            <i className="fa-solid fa-gear"></i>
            <Link to="/user/update">
              <button className="w-full text-left text-gray-300 hover:text-gray-100 focus:outline-none">
                Configuració
              </button>
            </Link>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
