import React, { useContext, useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, LogOut, Menu, X, User } from "lucide-react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef();
  const navigate = useNavigate();

  const { cartCount, query, setQuery } = useContext(ShopContext);

  const path = window.location.pathname;

  console.log(cartCount)

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("cartData");
    window.location.href = "/login";
  };

  const handleNavigateCart = () => {
    navigate("/cart");
  };

  const handleNavigateOrders = () => {
    navigate("/orders");
    setShowUserMenu(false); // close menu after navigating
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            <div
              onClick={() => (window.location.href = "/")}
              className="text-2xl font-bold text-gray-900 cursor-pointer"
            >
              Forever
            </div>

            <div className="hidden md:flex space-x-8 text-gray-700 font-medium text-sm">
              <a href="/" className="hover:text-black transition">
                Home
              </a>
              <a href="/collections" className="hover:text-black transition">
                Collection
              </a>
              <a href="/about" className="hover:text-black transition">
                About
              </a>
              <a href="/contact" className="hover:text-black transition">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4 relative">
              {path !== "/" && (
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="text-gray-600 hover:text-black transition"
                >
                  <Search size={20} />
                </button>
              )}

              <div onClick={handleNavigateCart} className="relative">
                <button className="text-gray-600 hover:text-black transition">
                  <ShoppingCart size={20} />
                </button>
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold rounded-full px-1 py-0.25">
                  {cartCount}
                </span>
              </div>

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-gray-600 hover:text-black transition"
                >
                  <User size={20} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={handleNavigateOrders}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-black text-white text-sm rounded-md hover:opacity-90 transition hidden md:block"
              >
                Logout
              </button>

              <button
                className="md:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showSearch && (
        <div className="w-full bg-white shadow-md py-4 z-40">
          <div className="max-w-3xl mx-auto px-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
