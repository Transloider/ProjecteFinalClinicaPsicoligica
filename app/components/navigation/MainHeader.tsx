import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../util/Logo";

interface MainHeaderProps {
  user_id: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ user_id }) => {
  return (
    <header className="relative flex items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 text-gray-200 shadow-lg">

      <div className="flex items-center">
        <Logo />
      </div>

      <nav className="absolute left-1/2 -translate-x-1/2">
        <ul className="flex items-center">
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
        </ul>
      </nav>

      <nav className="ml-auto">
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to={user_id ? "/clients" : "/auth"}
              className="text-sm rounded-lg bg-gray-800 px-4 py-2 text-gray-200 shadow-md transition-all duration-300 hover:bg-gray-700"
            >
              {user_id ? "Tornar" : "Login"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
