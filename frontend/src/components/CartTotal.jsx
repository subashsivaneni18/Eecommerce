import React from "react";

const CartTotal = ({ subtotal, shippingFee, total }) => {
  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800">Order Summary</h3>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-lg text-gray-700">Subtotal:</span>
          <span className="text-lg font-semibold text-gray-800">
            ₹{subtotal}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg text-gray-700">Shipping Fee:</span>
          <span className="text-lg font-semibold text-gray-800">
            ₹{shippingFee}
          </span>
        </div>
        <div className="flex justify-between border-t pt-4 mt-4 border-gray-200">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-green-600">₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
