import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const linkClasses = (isActive: boolean) =>
    `block w-full px-3 py-2 rounded-md font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
    }`;

  return (
    <aside className="absolute top-15 left-0 h-full w-56 bg-blue-300 shadow-md border-r p-6 z-20">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Menu</h2>

      <ul className="space-y-4">
        <li>
          <NavLink to="/students" className={({ isActive }) => linkClasses(isActive)}>
            Student Form
          </NavLink>
        </li>

        <li>
          <NavLink to="/" className={({ isActive }) => linkClasses(isActive)}>
            Home Page
          </NavLink>
        </li>

        <li>
          <NavLink to="/phones" className={({ isActive }) => linkClasses(isActive)}>
            Phones Page
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
