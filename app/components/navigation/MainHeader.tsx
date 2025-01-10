import React from "react";
import { Form, Link, NavLink, useLoaderData } from "react-router-dom";
import Logo from "../util/Logo";

const MainHeader: React.FC = () => {
  const userID = useLoaderData<string>();

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 text-gray-200 shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Logo />
      </div>

      <nav className="flex space-x-4">
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300"
                  : "transition-colors duration-300 hover:text-gray-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive
                  ? "text-pink-300"
                  : "transition-colors duration-300 hover:text-gray-400"
              }
            >
              Sobre Nosaltres
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Call to Action Navegació */}
      <nav id="cta-nav">
        <ul className="flex items-center space-x-4">
          <li>
            {userID ? (
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="rounded-lg bg-gray-800 px-4 py-2 text-gray-200 shadow-md transition-all duration-300 hover:bg-gray-700"
                >
                  Logout
                </button>
              </Form>
            ) : (
              <Link
                to="/auth"
                className="rounded-lg bg-gray-800 px-4 py-2 text-gray-200 shadow-md transition-all duration-300 hover:bg-gray-700"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
