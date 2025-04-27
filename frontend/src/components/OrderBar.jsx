import React from "react";

const OrderBar = ({ product, item }) => {
  if (!product) return null;


  

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-28 h-28 object-cover rounded-lg border"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2 sm:gap-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Size: <span className="font-medium">{item.size}</span> |
                Quantity: <span className="font-medium">{item.quantity}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">Unit Price</p>
              <p className="text-md font-semibold text-gray-700">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Subtotal */}
          <div className="mt-2 sm:mt-4 text-sm text-gray-600 flex justify-between items-center border-t pt-2">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">
              ${(product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBar;
