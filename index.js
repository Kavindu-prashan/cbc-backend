import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import { loginUser } from "./controllers/userController.js";
import jwt from "jsonwebtoken";

const app = express();
const mongoUrl = "mongodb+srv://admin:123@cluster0.jn53j.mongodb.net/?retryWrites=true&w=majority";

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
        jwt.verify(token,"cbc-secret-key-7973",(error, decoded)=>{
            if (!error) {
                console.log(decoded)
                req.user = decoded
            }
        })
    }

    next()
  }

);
  










// Routes
app.use("/api/students", studentRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.post("/api/login", loginUser); // Separate login route


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
