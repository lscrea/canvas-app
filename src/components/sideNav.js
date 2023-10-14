import React from "react";
import { Link } from "react-router-dom";

function SideNav() {
    return (
        <div className="bg-gray-800 w-64 text-white p-6 h-screen flex flex-col">
          <h1 className="text-2xl mb-6">Navigation</h1>
          <ul className="space-y-4 flex-1">
            <li>
              <Link to="/modeles" className="hover:text-blue-500">
                Modèles de Machine
              </Link>
            </li>
            <li>
              <Link to="/machines" className="hover:text-blue-500">
                Machines
              </Link>
            </li>
          </ul>
        </div>
      );
}

export default SideNav;
