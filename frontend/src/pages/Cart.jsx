import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";


const Cart = () => {


    const [userToken, setUserToken] = useState(
      localStorage.getItem("userToken") || ""
    );
  
    if (userToken === "") {
      window.location.href = "/login";
    }


  const { cartData, products, setCartData } = useContext(ShopContext);
  const navigate = useNavigate();

  const cartItems = Object.entries(cartData);

  const clearCart = () => {
    localStorage.removeItem("cartData");
    setCartData({});
  };

  const getProductById = (id) => products.find((product) => product._id === id);

  const updateQuantity = (productId, size, action) => {
    const updatedCart = structuredClone(cartData);
    const currentQty = updatedCart[productId]?.[size] || 0;

    if (action === "increment") {
      updatedCart[productId][size] = currentQty + 1;
    } else if (action === "decrement") {
      if (currentQty > 1) {
        updatedCart[productId][size] = currentQty - 1;
      } else {
        delete updatedCart[productId][size];
        if (Object.keys(updatedCart[productId]).length === 0) {
          delete updatedCart[productId];
        }
      }
    }

    setCartData(updatedCart);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, [productId, sizeObj]) => {
      const product = getProductById(productId);
      if (!product) return total;
      return (
        total +
        Object.entries(sizeObj).reduce(
          (subtotal, [size, quantity]) => subtotal + quantity * product.price,
          0
        )
      );
    }, 0);
  };

  const subtotal = getTotalAmount();
  const shippingFee = 50; // Example shipping fee, can be dynamic based on location or cart amount
  const totalAmount = subtotal + shippingFee;

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map(([productId, sizeObj]) => {
            const product = getProductById(productId);
            return Object.entries(sizeObj).map(([size, quantity]) => (
              <div
                key={`${productId}-${size}`}
                className="flex flex-col md:flex-row items-center justify-between gap-6 border rounded-xl p-4 shadow-md bg-white"
              >
                {/* Image */}
                <div
                  className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => handleImageClick(productId)}
                >
                  <img
                    src={product?.image || "/placeholder.jpg"}
                    alt={product?.name}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  <h3 className="text-xl font-semibold">{product?.name}</h3>
                  <p className="text-sm text-gray-500">Size: {size}</p>

                  <div className="flex items-center mt-2 gap-4">
                    <button
                      onClick={() =>
                        updateQuantity(productId, size, "decrement")
                      }
                      className="text-lg w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(productId, size, "increment")
                      }
                      className="text-lg w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-xl font-bold text-green-600 mt-4 md:mt-0">
                  ₹{product?.price * quantity}
                </div>
              </div>
            ));
          })}
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <CartTotal
            subtotal={subtotal}
            shippingFee={shippingFee}
            total={totalAmount}
          />

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-md text-lg transition-all"
            >
              🧹 Clear Cart
            </button>
            <button
              onClick={() => navigate('/placeOrder')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md text-lg transition-all"
            >
              ✅ Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
