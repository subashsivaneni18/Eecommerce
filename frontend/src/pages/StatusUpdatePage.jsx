import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const StatusUpdatePage = () => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState(
    "Updating your order status... Please do not close this page."
  );

  const { setCartData } = useContext(ShopContext);

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        const res = await axios.post(
          `${VITE_BACKEND_HOST_URL}/api/order/update/${id}`
        );
        if (res.status === 200) {
          toast.success("✅ Order successfully placed");
          setStatusMsg(
            "🎉 Order placed successfully! You can now close this page."
          );
          setCartData({})
          localStorage.removeItem("cartData")
        } else {
          toast.error("❌ Something went wrong");
          setStatusMsg(
            "Something went wrong while updating your order. Please try again."
          );
        }
      } catch (error) {
        toast.error("❌ Failed to update order");
        setStatusMsg(
          "An error occurred. Please contact support if this persists."
        );
      } finally {
        setLoading(false);
      }
    };

    updateOrderStatus();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center w-full">
        {loading ? (
          <>
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Please wait...
            </h2>
            <p className="text-gray-500">{statusMsg}</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Order Update
            </h2>
            <p className="text-gray-600">{statusMsg}</p>
          </>
        )}
        <p className="text-sm text-gray-400 mt-6">
          Order ID: <span className="font-medium">{id}</span>
        </p>
      </div>
    </div>
  );
};

export default StatusUpdatePage;
