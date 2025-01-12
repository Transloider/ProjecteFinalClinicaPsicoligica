import { Link } from "@remix-run/react";
import { useState } from "react";
import { AsideProps } from "../../types/interfaces";

const DropdownMenu: React.FC<AsideProps> = (asideProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-sm mr-3 rounded-lg bg-gray-800 px-4 py-2 text-gray-200 shadow-md transition-all duration-300 hover:bg-gray-700 block sm:hidden"
        aria-label="Toggle menu"
      >
        <i className="fa-solid fa-bars mr-1"></i>
        <span>Menu</span>
      </button>

      {isMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-gray-800 text-gray-300 shadow-lg rounded-md z-50"
          onClick={() => setIsMenuOpen(false)}
          role="menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMenuOpen(false);
            }
          }}
        >
          <ul className="py-2">
            <li>
              <Link
                to="/clients"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/clients/addClient"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
              >
                Afegir nou client
              </Link>
            </li>
            <li className="relative">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-700 hover:text-white flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu();
                }}
              >
                Tests
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              {/* Submenú */}
              {isMenuOpen && (
                <ul className="mt-1 pl-4">
                  <li>
                    <Link
                      to="/tests/add"
                      className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                    >
                      Afegir
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tests/update"
                      className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                    >
                      Modificar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tests/delete"
                      className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                    >
                      Eliminar
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/calendar"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
              >
                Calendari
              </Link>
            </li>
            <li>
              <Link
                to="/message/users"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
              >
                Missatges
              </Link>
            </li>
            <li>
              <Link
                to="/user/update"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
              >
                Configuració del perfil
              </Link>
            </li>
            {asideProps.isAdmin && (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <li>
                  <Link
                    to="/user/migrate"
                    className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                  >
                    Migrar Informes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clients/addUser"
                    className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                  >
                    Afegir Treballador
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setIsMenuOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMenuOpen(false);
            }
          }}
        ></div>
      )}
    </div>
  );
};

export default DropdownMenu;
