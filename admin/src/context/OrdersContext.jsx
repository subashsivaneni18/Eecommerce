import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const OrdersContext = createContext();

const OrderContextProvider = ({ children }) => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    const x = async () => {
      try {
        const res = await axios.get(
          `${VITE_BACKEND_HOST_URL}/api/order/all`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected here
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    x();
  }, []);

  const orders = data ? data : [];

  const value = {
    orders,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

export default OrderContextProvider;
