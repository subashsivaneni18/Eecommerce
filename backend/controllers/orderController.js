import mongoose from "mongoose";
import OrderModel from "../models/OrderModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto"; 


const stripe = new Stripe(process.env.STRIPE_SECRET); 


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


// COD Order
const placeOrder = async (req, res) => {
  try {
    let { userId, items, paymentType, address, amount, date } = req.body;

    const status = "Placed";
    const payment = false;

    amount=amount+50
    

    const data = {
      userId,
      items,
      address,
      paymentType,
      amount,
      date,
      status,
      payment,
    };

    const newOrder = await OrderModel.create(data);
    res.json(newOrder); 
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Stripe Order
const placeStripeOrder = async (req, res) => {
  try {
    const { userId, items, paymentType, address, amount, date } = req.body;

    const status = "Pending"; // Mark initial order as pending
    const payment = false;

    const orderData = {
      userId,
      items,
      address,
      paymentType,
      amount,
      date,
      status,
      payment,
    };

    // 1. Create the order and save it in DB
    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    // 2. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: (Math.round(item.price)+50)*100,
        },
        quantity: Object.values(item.quantity).reduce((a, b) => a + b, 0),
      })),
      mode: "payment",
      customer_email: "s@gmail.com", // optionally dynamic
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      success_url: `http://localhost:5173/status/update/${newOrder._id}`, // user redirected here on success
      cancel_url: `http://localhost:5173/status/delete/${newOrder._id}`, // user redirected here if cancels or fails
    });

    // 3. Send session URL to client to redirect
    res.json({ url: session.url, orderId: newOrder._id });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ message: "Stripe Payment Intent Failed" });
  }
};



// get Order of a specific User
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await OrderModel.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




// update Order Payment Status
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const ExistingOrder = await OrderModel.findOne({_id:id});

    if (!ExistingOrder) {
      return res.status(400).json({ Message: "No Order Found" });
    }

    ExistingOrder.payment = true;
    ExistingOrder.status="Placed"
    await ExistingOrder.save();

    res.status(200).json({ Message: "Payment status updated successfully", order: ExistingOrder });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Message: "Internal Server Error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const orderExist = await OrderModel.findById(id);

    if (!orderExist) {
      return res.status(400).json({ message: "No Order Found" });
    }

    await orderExist.deleteOne(); // no need to pass {_id:id} here

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// razor pay payment apis


// Razorpay Payment: Create Order
const order = async (req, res) => {
  try {
    let { amount } = req.body;

    

    if (!amount || isNaN(amount)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }


    // amount is assumed to be in rupees, multiply by 100 for paise
    const options = {
      amount: Math.round(amount * 100), // <-- make sure it is correct
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 100)}`,
    };

    const razorpayOrder = await instance.orders.create(options);

    console.log("Razorpay Order Created:", razorpayOrder);

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const verify = async (req, res) => {
  try {
    let {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      items,
      paymentType,
      address,
      amount,
      date,
    } = req.body;

    const status = "Placed";
    const payment = false;
    amount=amount+50
    const orderData = {
      userId,
      items,
      address,
      paymentType,
      amount, // don't add +50 again here
      date,
      status,
      payment,
    };

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature. Payment verification failed.",
      });
    }

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    console.log("Order Saved Successfully:", newOrder);

    return res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};



// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, Status } = req.body; // corrected: req.body, not req.json()

    // Input validation
    if (!orderId || !Status) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    // Find the order
    const order = await OrderModel.findOne({ _id: orderId });

    if (!order) {
      return res.status(404).json({ message: "Order Not Found" }); // 404 is better for "Not Found"
    }

    // Update the status
    order.status = Status;
    await order.save(); // Save the updated order

    // Send success response
    res.status(200).json({ message: "Order Status Updated Successfully", updatedOrder: order });

  } catch (error) {
    console.log(error); // corrected typo: conslo -> console
    res.status(500).json({ message: "Internal Server Error" });
  }

 
};




export {
  placeOrder,
  placeStripeOrder,
  getOrdersByUser,
  getAllOrders,
  updatePaymentStatus,
  deleteOrder,
  order,
  verify,
  updateOrderStatus,
};
