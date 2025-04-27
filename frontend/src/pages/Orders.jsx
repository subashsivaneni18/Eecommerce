import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CurrentUserContext } from "../../context/CurrenUserContext";
import { ShopContext } from "../../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";


const Orders = () => {

  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;


  const [userToken] = useState(localStorage.getItem("userToken") || "");
  const [orders, setOrders] = useState([]);
  const { data } = useContext(CurrentUserContext);
  const { products } = useContext(ShopContext);


  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) window.location.href = "/login";
  }, [userToken]);

  useEffect(() => {
    if (!data?._id) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.post(
          `${VITE_BACKEND_HOST_URL}/api/order/userId`,
          {
            userId: data._id,
          }
        );

        const sortedOrders = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const ordersWithImages = sortedOrders.map((order) => ({
          ...order,
          items: order.items.map((item) => {
            const product = products.find((p) => p._id === item.productId);
            return {
              ...item,
              image: product?.image[0] || "/placeholder.png",
              name: product?.name || "Product Name",
            };
          }),
        }));

        setOrders(ordersWithImages);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [data, products]);


  

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    Order ID: <span className="text-blue-600">{order._id}</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${
                      order.status === "Placed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/product/${item.productId}`)}
                  >
                    <div className="flex items-center py-4 space-x-4 cursor-pointer hover:bg-gray-100 rounded-md p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Price: {"₹"}
                          {item.price}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Quantity: {Object.values(item.quantity)[0]}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          {"₹"}
                          {(
                            item.price * Object.values(item.quantity)[0]
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment, Total, Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Payment Info */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-gray-700">
                    Payment Info:
                  </h4>
                  <p className="text-gray-600">
                    Payment Status:{" "}
                    <span
                      className={
                        order.payment ? "text-green-600" : "text-red-600"
                      }
                    >
                      {order.payment ? "Paid" : "Pending"}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Payment Method: {order.paymentType}
                  </p>
                  <p className="text-gray-600 text-lg font-semibold">
                    Total Cart Amount: {"₹"}
                    {order.amount.toFixed(2) - 50}
                  </p>
                  <p className="text-gray-600 text-lg font-semibold">
                    Shipping Amount: {"₹"}
                    {(50).toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-lg font-semibold">
                    Total Amount: {"₹"}
                    {order.amount.toFixed(2)}
                  </p>
                </div>

                {/* Address Info */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-gray-700">
                    Billing Address:
                  </h4>
                  <p className="text-gray-600">{order.address.name}</p>
                  <p className="text-gray-600">{order.address.address}</p>
                  <p className="text-gray-600">
                    {order.address.city}, {order.address.zip}
                  </p>
                  <p className="text-gray-600">Phone: {order.address.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
