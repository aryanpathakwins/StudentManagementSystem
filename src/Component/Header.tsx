import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-xl font-semibold tracking-wide">
        Student Management System
      </h1>
    </header>
  );
};

export default Header;
