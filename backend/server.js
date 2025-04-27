import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongoDb.js'
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import orderRouter from './routes/orderRoutes.js';
import trailRouter from './routes/trailRoute.js';


const app = express();

// connections
connectDb();
connectCloudinary()


// middlewares
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})

// routes
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/order',orderRouter)


app.use('/api/payment',trailRouter)

