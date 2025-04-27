import express from 'express'
import adminAuth from "../middlewares/AdminAuth.js"
import 
{
 DeleteProduct,
 ListofProducts,
 createProduct,
 SingleProduct,
 updateProduct
} 
from '../controllers/productController.js'
import upload from '../middlewares/upload.js'

const productRouter = express.Router()

productRouter.post(
  "/create",
  upload.fields([
    { name: "Image1", maxCount: 1 },
    { name: "Image2", maxCount: 1 },
    { name: "Image3", maxCount: 1 },
    { name: "Image4", maxCount: 1 },
  ]),adminAuth,
  createProduct
);

productRouter.get("/list", ListofProducts);
productRouter.post("/delete", adminAuth, DeleteProduct);
productRouter.get("/single/:id", SingleProduct);
productRouter.put(
  "/update/:id",
  upload.fields([
    { name: "Image1", maxCount: 1 },
    { name: "Image2", maxCount: 1 },
    { name: "Image3", maxCount: 1 },
    { name: "Image4", maxCount: 1 },
  ]),
  adminAuth,
  updateProduct
);

export default productRouter