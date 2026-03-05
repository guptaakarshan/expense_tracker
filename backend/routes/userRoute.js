import express from "express";

import { changePassword,updateUser,getLoginUser,loginUser,registerUser } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

//protected routes

userRouter.get("/me",auth,getLoginUser);
userRouter.put("/profile",auth,updateUser);
userRouter.put("/password",auth,changePassword);
export default userRouter;