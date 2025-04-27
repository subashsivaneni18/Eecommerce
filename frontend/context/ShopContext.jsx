// ShopContext.js
import { createContext, useEffect, useState } from "react";
import fetcher from "../libs/fetcher";
import useSWR from "swr";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {


  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;

  const { data, error, isLoading } = useSWR(
    `${VITE_BACKEND_HOST_URL}/api/product/list`,
    fetcher
  );

  const products = data || [];

  const [cartData, setCartData] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cartData");
      return storedCart ? JSON.parse(storedCart) : {};
    } catch (e) {
      console.error("Failed to parse cart data from localStorage", e);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const addToCart = (productId, size) => {
    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const updatedCart = { ...cartData };

    if (updatedCart[productId]) {
      updatedCart[productId][size] = (updatedCart[productId][size] || 0) + 1;
    } else {
      updatedCart[productId] = { [size]: 1 };
    }

    setCartData(updatedCart);
  };

  const getCartCount = () => {
    return Object.values(cartData).reduce((acc, sizes) => {
      return acc + Object.values(sizes).reduce((sum, count) => sum + count, 0);
    }, 0);
  };

  const getCartTotal = () => {
    return Object.keys(cartData).reduce((total, productId) => {
      const product = products.find((p) => p._id === productId);
      if (product) {
        const sizes = cartData[productId];
        for (const size in sizes) {
          total += product.price * sizes[size];
        }
      }
      return total;
    }, 0).toFixed(2);
  };


  const [query,setQuery] = useState("")

  const value = {
    products,
    cartData,
    addToCart,
    isLoading,
    error,
    getCartCount,
    getCartTotal,
    query,
    setQuery
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
