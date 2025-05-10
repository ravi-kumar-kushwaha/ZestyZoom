import express from "express";
import {
  allUsers,
  loginUser,
  registerUser,
  singleUser,
  updateUserCoverImage,
  updatedUserDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.post(
  "/signup",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
router.post("/signin", loginUser);
router.get("/single-user/:id", verifyToken, singleUser);
router.put("/update-user-details/:id", verifyToken, updatedUserDetails);
router.put(
  "/update-user-coverImage/:id",
  verifyToken,
  upload.single("coverImage"),
  updateUserCoverImage
);
router.get("/all-users", verifyToken, allUsers);
export default router;
