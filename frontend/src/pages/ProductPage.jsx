// pages/ProductPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import RelatedProducts from "../components/RelatedProducts";
import { ShopContext } from "../../context/ShopContext";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

const ProductPage = () => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const { id } = useParams();
  const {
    data: productData,
    error,
    isLoading,
  } = useSWR(`${VITE_BACKEND_HOST_URL}/api/product/single/${id}`, fetcher);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (productData?.image?.length > 0) {
      setSelectedImage(productData.image[0]);
    }
  }, [productData]);

  const { cartData, addToCart } = useContext(ShopContext);
  

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-10 text-red-500">
        Failed to load product
      </div>
    );
  if (!productData) return null;

  const {
    name,
    price,
    description,
    image = [],
    sizes = [],
    category,
    subcategory,
  } = productData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-6">
        {/* Thumbnail Column */}
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible w-full lg:w-20 shrink-0">
          {image.map((img, index) => (
            <div key={index} className="aspect-square w-16 shrink-0">
              <img
                src={img}
                alt={`${name}-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-full h-full object-cover rounded-lg border-2 cursor-pointer transition duration-300 ${
                  selectedImage === img ? "border-pink-500" : "border-gray-300"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex justify-center items-center">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-[550px] w-auto rounded-2xl shadow-lg object-contain"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-[350px] space-y-6">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-gray-600 text-sm">
            {category} / {subcategory}
          </p>
          <p className="text-2xl text-pink-600 font-semibold">
            {"₹"}
            {price.toFixed(2)}
          </p>
          <p className="text-gray-700 leading-relaxed">{description}</p>

          {/* Size Options */}
          {sizes.length > 0 && (
            <div>
              <label className="block font-medium mb-2">Select Size:</label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <span
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm cursor-pointer transition 
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "hover:bg-gray-100 border-gray-300"
                      }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(id, selectedSize)}
            className="w-full bg-black text-white py-3 rounded-xl text-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* Features */}
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              ✅ <span>100% Original Products</span>
            </div>
            <div className="flex items-center gap-2">
              🔄 <span>7-Day Return Policy</span>
            </div>
            <div className="flex items-center gap-2">
              💵 <span>Cash on Delivery Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={category} subcategory={subcategory} id={id} />
    </div>
  );
};

export default ProductPage;
