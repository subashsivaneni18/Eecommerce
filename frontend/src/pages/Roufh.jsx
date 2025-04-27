import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { CurrentUserContext } from "../../context/CurrenUserContext";


const Roufh = () => {
  const [amount, setAmount] = useState();
  const { currentUser } = useContext(CurrentUserContext);

  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  

  // Handle Payment
  const handlePayment = async () => {
    try {
      const res = await fetch(`${VITE_BACKEND_HOST_URL}/api/payment/razor/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      console.log("Order created:", data);

      if (data?.order) {
        handlePaymentVerify(data.order);
      } else {
        console.error("Order data missing", data);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Handle Payment Verification
  const handlePaymentVerify = async (order) => {
    const options = {
      key: RAZORPAY_KEY_ID, // Razorpay key id from .env
      amount: order.amount,
      currency: order.currency,
      name: "Devknus",
      description: "Test Payment",
      order_id: order.id,
      handler: async (response) => {
        console.log("Payment success:", response);
        try {
          const res = await fetch(
            `${VITE_BACKEND_HOST_URL}/api/payment/razor/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await res.json();
          console.log("Verify Response:", verifyData);

          if (verifyData.success) {
            alert("Payment verified successfully!");
          } else {
            alert("Payment verification failed!");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="p-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        className="border px-2 py-1 mr-2"
      />
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Pay
      </button>
    </div>
  );
};

export default Roufh;
