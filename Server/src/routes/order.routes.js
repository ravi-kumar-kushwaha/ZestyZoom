import express from "express";
import {
  allOrders,
  deleteOrderItem,
  getSingleOrder,
  keyId,
  placeCodOrder,
  placeOrder,
  updateOrderItem,
  userOrders,
  verifyPayments
} from "../controllers/order.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();
router.post("/place-order", verifyToken, placeOrder);
router.post("/place-cod-order", verifyToken, placeCodOrder);
router.post("/verify-order",verifyPayments);
router.get("/user-orders", verifyToken, userOrders);
router.get("/single-order/:orderId", verifyToken, getSingleOrder);
router.put("/update-orderItem/:orderId", verifyToken, updateOrderItem);
router.delete("/delete-orderItem/:orderId", verifyToken, deleteOrderItem);
router.get("/all-orders", verifyToken, allOrders);

router.get("/get-key", keyId);
export default router;
