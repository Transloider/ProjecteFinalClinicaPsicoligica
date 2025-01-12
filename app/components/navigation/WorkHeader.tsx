import React from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import Logo from "../util/Logo";
import DropdownMenu from "../layout/DropdownMenu";
import { useMatches } from "@remix-run/react";

const WorkHeader: React.FC = () => {
  const userID = useLoaderData<string>();
  const useMatched = useMatches();
  const matchedRoute = useMatched.find(({id}) => id === "routes/_app");
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 text-gray-200  w-full fixed">
      <div className="text-2xl font-bold">
        <Logo />
      </div>
      <nav id="cta-nav">
        <ul className="flex items-center space-x-4">
          <li>
            {userID ? (
              <div className="flex flex-row items-center">
                <DropdownMenu isAdmin={matchedRoute?.data?.isAdmin} />
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className="text-sm rounded-lg bg-gray-800 px-4 py-2 text-gray-200 shadow-md transition-all duration-300 hover:bg-gray-700"
                    aria-label="logout"
                  >
                    Logout
                  </button>
                </Form>
              </div>
            ) : (
              <Link
                to={userID? "/auth" : "/clients"}
                className="text-sm rounded-lg bg-gray-800 px-4 py-2 text-gray-200 shadow-md transition-all duration-300 hover:bg-gray-700"
              >
                {userID? 'Tornar' : 'Login'}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default WorkHeader;
