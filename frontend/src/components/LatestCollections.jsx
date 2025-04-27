import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { ShopContext } from "../../context/ShopContext";

const LatestCollections = () => {
  const { products, isLoading, error } = useContext(ShopContext);

  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500">Loading products...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load products.</p>
    );
  }

  return (
    <div className="w-full flex justify-center bg-white py-12 px-4">
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Latest Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 px-4">
          {Array.isArray(products) && products.length > 0 ? (
            [...products] // create a shallow copy
              .sort((a, b) => b.date - a.date) // sort by date descending
              .slice(0, 5) // take only the first 5 products
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestCollections;
