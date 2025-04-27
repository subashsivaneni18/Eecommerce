import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // for toast notifications


const OrderBar = ({ order }) => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const [selectedStatus, setSelectedStatus] = useState(
    order.status.toLowerCase()
  );

  if (!order) return null;

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    try {
      const res = await axios.post(
        `${VITE_BACKEND_HOST_URL}/api/order/orderStatus/update`,
        {
          orderId: order._id,
          Status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1), // Capitalize first letter
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        toast.success("Order Status Updated Successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border border-gray-200 rounded-2xl shadow-md p-4 mb-4 gap-4 hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail */}
      <div className="w-full md:w-[80px] h-[80px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src="/vite.svg"
          alt="thumbnail"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Item Info */}
      <div className="flex-1 min-w-[200px]">
        <p className="text-sm font-medium text-gray-800 mb-2">Items:</p>
        <div className="space-y-2">
          {order.items.map((item, i) => {
            const [size, qty] = Object.entries(item.quantity)[0];
            return (
              <div key={i} className="flex items-center text-sm text-gray-800">
                <span className="font-semibold">{item.name}</span>
                <span className="ml-2">
                  × {qty} ({size})
                </span>
              </div>
            );
          })}
        </div>

        {/* Address Info */}
        <p className="text-xs text-gray-500 mt-3">
          {order.address.address}, {order.address.city}, {order.address.zip}
        </p>
      </div>

      {/* Summary */}
      <div className="min-w-[150px] text-sm text-gray-700">
        <p>
          <span className="font-semibold">Items:</span> {order.items.length}
        </p>
        <p>
          <span className="font-semibold">Payment:</span> {order.paymentType}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(order.date).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Payment Status:</span>{" "}
          {order.payment ? "Completed" : "Pending"}
        </p>
      </div>

      {/* Total */}
      <div className="min-w-[120px] text-right">
        <p className="text-xl font-bold text-green-600">₹{order.amount}</p>
      </div>

      {/* Status Dropdown */}
      <div className="min-w-[160px]">
        <label
          htmlFor="status"
          className="block text-xs font-medium text-gray-500 mb-1"
        >
          Order Status
        </label>
        <select
          id="status"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="placed">Placed</option>
          <option value="packing">Packing</option>
          <option value="outfordelivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
    </div>
  );
};

export default OrderBar;
