import express from "express";
import authUser from "../middleware/authUser.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
} from "../controllers/orderController.js";
import authSeller from "../middleware/authSeller.js";

const orderRoute = express.Router();

orderRoute.post("/cod", authUser, placeOrderCOD);
orderRoute.get("/user", authUser, getUserOrders);
orderRoute.get("/seller", authSeller, getAllOrders);

export default orderRoute
