import { Link } from "@remix-run/react";
import React from "react";

const Logo: React.FC = () => {
  return (
    <h1 id="logo" className="text-3xl font-bold">
      <Link to="/clients" className="text-white hover:text-gray-200">
        Clínica Psicològica
      </Link>
    </h1>
  );
};

export default Logo;
