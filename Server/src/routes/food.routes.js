import express from "express";
import { 
    addFoodItem,
    createFoofItem,
    deleteFoodItem,
    getAllFoodItems, 
    getFoodItemById, 
    insertAllFoods, 
    updateFoodItem, 
    updateFoodItems 
} from "../controllers/food.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verify } from "crypto";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.post("/insert-all-foods",insertAllFoods);
router.get("/get-all-foods",getAllFoodItems);
router.get("/get-food/:id",getFoodItemById);
router.put("/update-food/:id",upload.single("image"),updateFoodItems);
router.post("/create-food",upload.single("image"),createFoofItem);
router.delete("/delete-food/:foodId",verifyToken,deleteFoodItem);
router.post("/add-food",upload.single("image"),addFoodItem);
router.put("/update-foodItem/:id",upload.single("image"),updateFoodItem);
export default router