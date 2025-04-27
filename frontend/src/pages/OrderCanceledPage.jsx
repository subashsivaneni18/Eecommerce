import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderCanceledPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;

  useEffect(() => {
    const cancelOrder = async () => {
      try {
        await axios.delete(`${VITE_BACKEND_HOST_URL}/api/order/delete/${id}`);
        // You can optionally show a toast or log it
      } catch (error) {
        console.error("Failed to cancel order:", error.message);
      }
    };

    cancelOrder();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center w-full border border-red-300">
        <div className="text-red-500 text-5xl mb-4 animate-bounce">❌</div>
        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          Payment Canceled
        </h2>
        <p className="text-gray-600 mb-4">
          Your payment was canceled. The order has been removed.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Order ID: <span className="font-medium">{id}</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default OrderCanceledPage;
