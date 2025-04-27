import React from "react";
import useSWR from "swr";
import ProductCard from "./ProductCard"; // Import the ProductCard component
import { FaTrashAlt } from "react-icons/fa"; 
import axios from "axios";
import toast from "react-hot-toast";

const DeletePageComponent = () => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  

  const { data, error } = useSWR(
    `${VITE_BACKEND_HOST_URL}/api/product/list`,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
  );

  if (error) return <div className="text-red-500">Error loading products.</div>;
  if (!data) return <div>Loading...</div>;


  

  const handleDelete =async (productId) => {
      try {
        const res = await axios.post(
          `${VITE_BACKEND_HOST_URL}/api/product/delete`,
          {
            id: productId,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success("Deleted Successfully!");
      } catch (error) {
        console.log(error)
        toast.error("Successfully toasted!");
      }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.map((item) => (
        <div
          key={item._id}
          className={`relative group rounded-lg overflow-hidden bg-white transition-all duration-300 ${
            item.bestSeller
              ? "shadow-md hover:shadow-xl transform hover:scale-105"
              : "shadow-none" // No shadow for non-best sellers
          }`}
        >
          <ProductCard product={item} />

          {/* Delete Icon */}
          <button
            onClick={() => handleDelete(item._id)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DeletePageComponent;
