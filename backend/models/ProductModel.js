import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Corrected from 'pice' to 'price'
  image: { type: Array, default: [], required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestSeller: { type: Boolean, default: false },
  date: { type: Number, required: true },
});

const productModel =
  mongoose.model.productModel || mongoose.model("product", productSchema);

export default productModel;
