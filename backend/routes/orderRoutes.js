import express from "express";
import {
  placeOrder,
  placeStripeOrder,
  deleteOrder,
  getOrdersByUser,
  getAllOrders,
  updatePaymentStatus,
  order,
  verify,
  updateOrderStatus
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/AdminAuth.js";



const orderRouter = express.Router();

// not Admin
orderRouter.post("/create/cod", placeOrder); // COD
orderRouter.post("/create/stripe", placeStripeOrder); // Stripe
orderRouter.post("/userId", getOrdersByUser);
orderRouter.post('/update/:id',updatePaymentStatus)
orderRouter.delete('/delete/:id',deleteOrder)


// Admin
orderRouter.get("/all", getAllOrders); // admin route
orderRouter.post("/orderStatus/update",adminAuth,updateOrderStatus)
export default orderRouter;
