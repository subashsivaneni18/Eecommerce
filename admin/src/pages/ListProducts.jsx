import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import LeftBar from "../components/LeftBar";
import useSWR from "swr";

const ListProduct = () => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const navigate = useNavigate();

  const { data, error } = useSWR(
    `${VITE_BACKEND_HOST_URL}/api/product/list`,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
  );

  if (error) return <div className="p-6">Error loading products.</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <LeftBar />
      <div className="flex-grow ml-0 md:ml-64 p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Product List</h1>

        <div className="space-y-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image & Info */}
              <div className="flex items-center gap-6">
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <img
                    src={item.image[0] || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm">₹{item.price}</p>
                </div>
              </div>

              {/* Update Button */}
              <button
                onClick={() => navigate(`/product/update/${item._id}`)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
              >
                <FaEdit className="text-sm" />
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
