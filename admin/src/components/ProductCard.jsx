import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full h-48">
        <img
          src={product.image[0] || "https://via.placeholder.com/300x200"} // fallback image if no image provided
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        {/* Product Category */}
        <p className="text-sm text-gray-500 mt-1">
          {product.category} - {product.subcategory}
        </p>
        {/* Product Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Product Price */}
        <p className="text-xl font-bold text-gray-900 mt-2">₹{product.price}</p>
        {/* Sizes */}
        <div className="flex flex-wrap gap-2 mt-2">
          {product.sizes.map((size, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-200 rounded-md"
            >
              {size}
            </span>
          ))}
        </div>
        {/* Best Seller Badge */}
        {product.bestSeller && (
          <span className="mt-2 inline-block text-xs bg-green-200 text-green-800 py-1 px-2 rounded-full">
            Best Seller
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
