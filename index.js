import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import { loginUser } from "./controllers/userController.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import cors from "cors"

dotenv.config()

const app = express();
const mongoUrl = process.env.MONGO_DB_URL

app.use(cors)

// Connect to MongoDB
mongoose
    .connect(mongoUrl) // No options needed for newer Mongoose versions
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(bodyParser.json());


app.use(
    
    (req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "")

    console.log(token)

    if(token != null){
        jwt.verify(token,process.env.secret,(error, decoded)=>{
            if (!error) {
                console.log(decoded)
                req.user = decoded
            }
        })
    }

    next()
  }

);
  



// student routers
app.use("/api/students", studentRouter);

//user routers
app.use("/api/users", userRouter);
app.post("/api/login", loginUser); // Separate login route

//product routers
app.use("/api/products",productRouter)

//order routers

app.use("/api/orders",orderRouter)

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
