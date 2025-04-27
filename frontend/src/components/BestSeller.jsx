import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductCard from "./ProductCard";
import { ShopContext } from "../../context/ShopContext";
import "../../styles/swiperStyles.css";

const BestSeller = () => {
  const { products, isLoading, error } = useContext(ShopContext);

  if (isLoading || (!products && !error)) {
    return <p className="text-center py-8">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-8">Failed to load products.</p>
    );
  }

  return (
    <div className="bg-white py-12 px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center w-full">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Best Sellers
      </h2>

      <div className="w-full max-w-7xl relative">
        <Swiper
          loop={true}
          spaceBetween={16}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {products &&
            products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSeller;
