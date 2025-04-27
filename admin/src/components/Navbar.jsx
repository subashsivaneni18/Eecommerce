import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white-primary text-black-soft px-6 py-4 shadow-sm border-b border-gray-light flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <p
          className="text-xl font-bold text-blue-accent cursor-pointer"
          onClick={() => navigate("/")}
        >
          Forever
        </p>
        <p className="text-lg text-gray-medium">Admin Panel</p>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center space-x-4">

        
        <p
          onClick={handleLogout}
          className="cursor-pointer hover:text-error-red transition"
        >
          Logout
        </p>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white-primary shadow-lg px-6 py-4 space-y-4">
          <div className="flex items-center space-x-3 text-gray-600">
            <p
              onClick={handleLogout}
              className="cursor-pointer hover:text-error-red transition"
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
