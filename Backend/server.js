import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./Routes/userRouter.js";
import productRoute from "./Routes/productRoute.js";
import { seedInitialProducts } from "./Services/prodectServices.js";
import cartRoute from './Routes/cartRoute.js' 
import  dotenv  from "dotenv";


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.DB_LOCALHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  seedInitialProducts();
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  console.log('Make sure MongoDB is installed and running on localhost:27017');
});

// Routes
app.use("/users", userRouter);
app.use("/products", productRoute);
app.use('/cart' ,  cartRoute )  

app.get("/", (req, res) => {
  res.json({ message: "E-commerce API is running!" });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
