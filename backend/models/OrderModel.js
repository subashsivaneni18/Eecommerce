import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Map, of: Number }, // 💡 Accepts { size: count }
    },
  ],
  address: {
    name: String,
    address: String,
    city: String,
    zip: String,
    phone: String,
  },
  paymentType: String,
  amount: Number,
  date: Date,
  status: String,
  payment: Boolean,
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel
