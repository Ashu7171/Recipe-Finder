import React from "react";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi"; // Importing a knife and fork icon

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between z-50 relative">
      {/* Left: Logo and Brand */}
      <div className="flex items-center space-x-3">
        <GiKnifeFork className="text-4xl text-purple-600" />
        <Link to="/" className="text-2xl font-bold text-purple-700">
          RecipeFinder
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
