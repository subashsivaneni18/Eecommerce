import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import { OrdersContext } from "../context/OrdersContext";
import OrderBar from "../components/OrderBar";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders } = useContext(OrdersContext);
  const [orderStatus, setOrderStatus] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-[100vh] bg-gray-100 text-gray-900">
      <LeftBar />
      <div className="flex-grow ml-0 md:ml-64 mt-8 px-6 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

        {/* Filter Section */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-500 text-lg">
              Showing orders with status: <strong>{orderStatus}</strong>
            </p>
            <div>
              <label
                htmlFor="orderStatus"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Filter by Order Status
              </label>
              <select
                id="orderStatus"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="block w-60 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="All">All</option>
                <option value="placed">Placed</option>
                <option value="delivered">Delivered</option>
                <option value="packing">Packing</option>
                <option value="outForDelivery">Out for Delivery</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto max-h-[500px] mt-10">
          {orders?.length > 0 ? (
            orders.map((order) => {
              return (
                <div key={order?._id} className="mb-4">
                  <OrderBar order={order} />
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No orders available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
