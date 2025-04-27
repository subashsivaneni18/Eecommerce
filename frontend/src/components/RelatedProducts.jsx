import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../components/ProductCard"; // Import ProductCard component

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json(); 
};

const RelatedProducts = ({ category, subcategory, id }) => {

  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;


  const { data: products, error } = useSWR(
    `${VITE_BACKEND_HOST_URL}/api/product/list`,
    fetcher
  );



  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter((product) => {
        return (
          product.category === category &&
          product.subcategory === subcategory &&
          product._id !== id // Exclude current product
        );
      });
      setRelatedProducts(filteredProducts);
    }
  }, [products, category, subcategory, id]);

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        Failed to load related products
      </div>
    );
  }

  return (
    <div className="mt-12">
      {relatedProducts.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="swiper-container"
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />{" "}
                {/* Pass the product to ProductCard */}
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      {relatedProducts.length === 0 && (
        <div className="text-center text-gray-600 mt-6">
          No related products found.
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
