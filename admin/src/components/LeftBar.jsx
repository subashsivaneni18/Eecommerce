import React from "react";
import { PlusCircle, Trash2, PackageCheck, Boxes } from "lucide-react"; // Added Boxes icon
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const navigate = useNavigate();

  const navigateToAddProduct = () => {
    navigate("/add");
  };

  const navigateToDeleteProduct = () => {
    navigate("/delete");
  };

  const navigateToOrders = () => {
    navigate("/orders");
  };

  const navigateToAllProducts = () => {
    navigate("/products");
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 w-64 bg-white-primary text-dark-gray shadow-lg px-6 py-8 flex flex-col gap-6">
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6 tracking-wide text-dark-brown">
          Admin Menu
        </h2>

        {/* Add Product */}
        <div
          onClick={navigateToAddProduct}
          className="flex items-center gap-4 hover:bg-teal-200 px-4 py-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <PlusCircle className="w-5 h-5 text-teal-500" />
          <p className="text-md text-gray-700">Add Product</p>
        </div>

        {/* Delete Product */}
        <div
          onClick={navigateToDeleteProduct}
          className="flex items-center gap-4 hover:bg-red-200 px-4 py-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
          <p className="text-md text-gray-700">Delete Product</p>
        </div>

        {/* Orders */}
        <div
          onClick={navigateToOrders}
          className="flex items-center gap-4 hover:bg-green-200 px-4 py-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <PackageCheck className="w-5 h-5 text-green-500" />
          <p className="text-md text-gray-700">Orders</p>
        </div>

        {/* List All Products */}
        <div
          onClick={navigateToAllProducts}
          className="flex items-center gap-4 hover:bg-blue-200 px-4 py-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Boxes className="w-5 h-5 text-blue-500" />
          <p className="text-md text-gray-700">List All Products</p>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
