import React, { useState, useMemo, useContext } from "react";
import dummyProducts from "../store/data";
import { ShopContext } from "../../context/ShopContext";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component

const CollectionsPage = () => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || ""
  );

  if (userToken === "") {
    window.location.href = "/login";
  }

  const { data, error, isLoading, products,query,setQuery } = useContext(ShopContext); 
  const displayedProducts = products.length > 0 ? products : dummyProducts;

  const [filters, setFilters] = useState({
    types: {
      topWear: false,
      bottomWear: false,
      winterWear: false,
    },
    categories: {
      men: false,
      women: false,
      kids: false,
    },
    priceRange: "low-to-high",
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (category, subCategory, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: value,
      },
    }));
  };

  const filteredProducts = useMemo(() => {
    let filtered = displayedProducts;

    const selectedTypes = Object.entries(filters.types)
      .filter(([_, val]) => val)
      .map(([key]) => key.toLowerCase());

    const selectedCategories = Object.entries(filters.categories)
      .filter(([_, val]) => val)
      .map(([key]) => key.toLowerCase());

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedTypes.includes(item.subcategory?.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category?.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) =>
      filters.priceRange === "low-to-high"
        ? a.price - b.price
        : b.price - a.price
    );

  if (query.trim().length > 0) {
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  }

    return filtered;
  }, [filters, displayedProducts,query]);

  console.log(query)
  console.log(filteredProducts)

  if (isLoading || (!products && !error)) {
    return <p className="text-center py-8">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-8">
        Failed to load products. Showing fallback.
      </p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row py-12 px-4 sm:px-8 md:px-16">
      {/* Filters Toggle Button for Mobile */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters Section */}
      <div
        className={`w-full md:w-1/4 p-4 bg-white rounded-lg shadow-md mb-8 md:mb-0
          transition-all duration-500 ease-in-out overflow-hidden
          ${showMobileFilters ? "block max-h-[1000px]" : "hidden"}
          md:block md:max-h-full`}
      >
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        {/* Type Filters */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-2">Type</h4>
          {["topWear", "bottomWear", "winterWear"].map((type) => (
            <label key={type} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={filters.types[type]}
                onChange={(e) =>
                  handleFilterChange("types", type, e.target.checked)
                }
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm capitalize">
                {type.replace(/([A-Z])/g, " $1")}
              </span>
            </label>
          ))}
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-2">Category</h4>
          {["men", "women", "kids"].map((cat) => (
            <label key={cat} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={filters.categories[cat]}
                onChange={(e) =>
                  handleFilterChange("categories", cat, e.target.checked)
                }
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm capitalize">{cat}</span>
            </label>
          ))}
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-2">Price</h4>
          {["low-to-high", "high-to-low"].map((range) => (
            <label key={range} className="flex items-center space-x-2 mb-2">
              <input
                type="radio"
                name="priceRange"
                value={range}
                checked={filters.priceRange === range}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, priceRange: range }))
                }
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm capitalize">
                {range.replace(/-/g, " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="w-full md:w-3/4 p-4">
        <h3 className="text-xl font-semibold mb-6">Products</h3>

        {filteredProducts.length === 0 ? (
          <p>No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} /> // Use ProductCard here
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;
