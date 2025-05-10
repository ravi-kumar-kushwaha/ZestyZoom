import express from "express";
import {
  allOrders,
  deleteOrderItem,
  getSingleOrder,
  keyId,
//   paymentVerification,
  placeOrder,
  updateOrderItem,
  userOrders,
  verifyPayments
} from "../controllers/order.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();
router.post("/place-order", verifyToken, placeOrder);
router.post("/verify-order",verifyToken,verifyPayments);
router.get("/user-orders", verifyToken, userOrders);
router.get("/single-order/:orderId", verifyToken, getSingleOrder);
router.put("/update-orderItem/:orderId", verifyToken, updateOrderItem);
router.delete("/delete-orderItem/:orderId", verifyToken, deleteOrderItem);
router.get("/all-orders", verifyToken, allOrders);

// router.post("/verify-order", verifyToken, paymentVerification);

router.get("/get-key", keyId);
export default router;
