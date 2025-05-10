import express from "express";
import { addToCart, getAllCartItems,getSingleUserCartItems, removeItemFromCart } from "../controllers/cartItem.controllers.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.post("/add-item-to-cart",verifyToken,addToCart);
router.post("/remove-item-from-cart",verifyToken,removeItemFromCart);
router.get("/get-user-cart-items",verifyToken,getSingleUserCartItems);
router.get("/get-all-cart-items",getAllCartItems);
export default router