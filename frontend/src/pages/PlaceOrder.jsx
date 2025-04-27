import React, { useContext, useState } from "react";
import {
  FaCashRegister,
  FaCreditCard,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import { CurrentUserContext } from "../../context/CurrenUserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const navigate = useNavigate();

  const { data } = useContext(CurrentUserContext);
  const { cartData, setCartData, products, cartTotal } =
    useContext(ShopContext);

  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [loading, setLoading] = useState(false); // new loading state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createOrderItems = () => {
    return Object.entries(cartData).map(([productId, sizeQuantityObj]) => {
      const product = products.find((p) => p._id === productId);
      return {
        productId,
        name: product?.name,
        price: product?.price,
        quantity: sizeQuantityObj,
      };
    });
  };

  const handlePlaceOrderCod = async () => {
    if (Object.keys(cartData).length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if(formData.address==="" || formData.city==="" || formData.name==="" || formData.zip==="" || formData.phone===""){
      toast.error("Enter All Fields")
      return
    }

    const toastId = toast.loading("Placing Cash on Delivery order...");
    setLoading(true);
    try {
      const address = { ...formData };
      const userId = data._id;
      const items = createOrderItems();
      const date = Date.now();
      const amount = Math.round((cartTotal));

      await axios.post(`${VITE_BACKEND_HOST_URL}/api/order/create/cod`, {
        userId,
        items,
        address,
        paymentType: selectedPayment,
        amount: amount,
        date,
      });

      localStorage.removeItem("cartData");
      setCartData({});
      toast.success("Order placed successfully!", { id: toastId });
      navigate("/orders");
    } catch (error) {
      console.error("Order Failed:", error);
      toast.error("Failed to place order!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrderStripe = async () => {
    if (Object.keys(cartData).length === 0) {
      toast.error("Cart is Empty");
      return;
    }

      if (
        formData.address === "" ||
        formData.city === "" ||
        formData.name === "" ||
        formData.zip === "" ||
        formData.phone === ""
      ) {
        toast.error("Enter All Fields");
        return;
      }

    const toastId = toast.loading("Redirecting to Stripe...");
    setLoading(true);
    try {
      const address = { ...formData };
      const userId = data._id;
      const items = createOrderItems();
      const date = Date.now();
      const amount = Math.round((cartTotal + 50));

      const res = await axios.post(
        `${VITE_BACKEND_HOST_URL}/api/order/create/stripe`,
        {
          userId,
          items,
          address,
          paymentType: selectedPayment,
          amount: amount + 50,
          date,
        }
      );

      const { url } = res.data;
      toast.dismiss(toastId);

      window.location.href = url;
    } catch (error) {
      console.error(error.message);
      toast.error("Stripe Payment Failed!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRazor = async () => {
    if (Object.keys(cartData).length === 0) {
      toast.error("The cart is empty");
      return;
    }

        if (
          formData.address === "" ||
          formData.city === "" ||
          formData.name === "" ||
          formData.zip === "" ||
          formData.phone === ""
        ) {
          toast.error("Enter All Fields");
          return;
        }

    const toastId = toast.loading("Initializing Razorpay payment...");
    setLoading(true);
    try {
      const address = { ...formData };
      const userId = data._id;
      const items = createOrderItems();
      const date = Date.now();
      const amount = Math.round(cartTotal);


      const res = await fetch(
        `${VITE_BACKEND_HOST_URL}/api/payment/razor/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            items,
            address,
            paymentType: "Razor pay",
            amount,
            date,
          }),
        }
      );

      const data2 = await res.json();
      if (data2?.order) {
        toast.dismiss(toastId);
        handlePaymentVerify(data2.order, {
          userId,
          items,
          address,
          amount,
          date,
          paymentType: "Razor pay",
        });
      } else {
        throw new Error("Failed to create Razorpay order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Razorpay Order Creation Failed!", { id: toastId });
      setLoading(false);
    }
  };

  const handlePaymentVerify = async (order, orderDetails) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Devknus",
      description: "Test Payment",
      order_id: order.id,
      handler: async (response) => {
        const toastId = toast.loading("Verifying Razorpay Payment...");
        try {
          const res = await fetch(
            `${VITE_BACKEND_HOST_URL}/api/payment/razor/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                ...orderDetails,
              }),
            }
          );

          const verifyData = await res.json();

          if (verifyData.success) {
            toast.success("Payment Successful!", { id: toastId });
            navigate("/orders");
            setCartData({})
            localStorage.removeItem("cartData")
          } else {
            toast.error("Payment Verification Failed!", { id: toastId });
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment Verification Error!", { id: toastId });
        } finally {
          setLoading(false);
        }
      },
      theme: { color: "#5f63b8" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePlaceOrder = () => {
    if (loading) return; // Prevent double click during loading
    if (selectedPayment === "COD") handlePlaceOrderCod();
    else if (selectedPayment === "Razorpay") handlePaymentRazor();
    else handlePlaceOrderStripe();
  };

  return (
    <div className="py-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Billing Address Form */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Billing Address
          </h2>
          <form className="space-y-6">
            {["name", "address", "city", "zip", "phone"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type="text"
                  required
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </form>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Payment Methods
          </h2>
          <div className="space-y-4">
            {[
              {
                method: "COD",
                label: "Cash on Delivery (COD)",
                icon: <FaCashRegister />,
              },
              { method: "Stripe", label: "Stripe", icon: <FaCreditCard /> },
              {
                method: "Razorpay",
                label: "Razorpay",
                icon: <FaRegMoneyBillAlt />,
              },
            ].map(({ method, label, icon }) => (
              <div
                key={method}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedPayment === method
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handlePaymentChange(method)}
              >
                <div
                  className={`w-8 h-8 ${
                    selectedPayment === method
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {icon}
                </div>
                <span className="ml-4 text-lg font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-10 text-center">
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-8 py-3 rounded-full shadow-md text-lg transition-all`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
