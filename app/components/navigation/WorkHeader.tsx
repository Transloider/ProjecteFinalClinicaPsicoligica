import React from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import Logo from "../util/Logo";

const WorkHeader: React.FC = () => {
  const userID = useLoaderData<string>();

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 text-gray-200  w-full fixed">
      <div className="text-2xl font-bold">
        <Logo />
      </div>
      <nav id="cta-nav">
        <ul className="flex items-center space-x-4">
          <li>
            {userID ? (
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="text-sm rounded-lg bg-gray-800 px-4 py-2 text-gray-200 shadow-md transition-all duration-300 hover:bg-gray-700"
                >
                  Logout
                </button>
              </Form>
            ) : (
              <Link
                to="/auth"
                className="text-sm rounded-lg bg-gray-800 px-4 py-2 text-gray-200 shadow-md transition-all duration-300 hover:bg-gray-700"
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

export default WorkHeader;
