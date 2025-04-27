import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto"; 
import OrderModel from "../models/OrderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Stripe Payment: Create Checkout Session
const trailStripePayment = async (req, res) => {
  try {
    const { amount, email } = req.body; // Accepting amount and customer email

    if (!amount || !email) {
      return res.status(400).json({ message: "Amount and Email are required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Jockey", // Hardcoded product name
            },
            unit_amount: Math.round(amount * 100), // Stripe expects amount in paisa
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email, // Use dynamic email
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Razorpay Payment: Create Order
const order = async (req, res) => {
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

        amount=amount+50

        const status = "Placed";
        const payment = false;

        const Orderdata = {
          userId,
          items,
          address,
          paymentType,
          amount,
          date,
          status,
          payment,
        };

        console.log(Orderdata)

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: (amount*100), // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`, // unique receipt id
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay order error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Razorpay Payment: Verify Payment
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
    const payment = true;
    amount=amount+50
    const Orderdata = {
      userId,
      items,
      address,
      paymentType,
      amount,
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
    
    
    
    
        const newOrder = new OrderModel(Orderdata);
        await newOrder.save();
    
        console.log("Order Saved Successfully:", newOrder);
    
        return res.status(200).json({
          success: true,
          message: "Payment verified and order created successfully!",
          order: newOrder,
        });
  } catch (error) {
    console.error("Razorpay verify error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { trailStripePayment, order, verify };
