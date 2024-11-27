import express from "express";
import { createUser, getUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Define routes
userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser); // Keep as is if using /api/users/login

export default userRouter;
