// components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div
      onClick={() => (window.location.href = `/product/${product._id}`)}
      className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 group border border-gray-200 cursor-pointer"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-56 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
          {product.name}
        </h3>

        {/* Truncated description to maintain uniform card height */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <p className="text-md text-gray-700 font-medium mt-2">
          {"₹"}{product.price.toFixed(2)}
        </p>

        <button className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
