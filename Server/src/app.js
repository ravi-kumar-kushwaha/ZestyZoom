import express from "express";
import cors from "cors";
import ConnectDB from "./config/db.js";

const app = express();

//middlewares
app.use(cors());
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//     exposedHeaders: ["Content-Range", "X-Content-Range"],
//     maxAge: 86400, 
//     preflightContinue: false, 
//     optionsSuccessStatus: 204 
//   }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
ConnectDB();

//food routes
import foodRoutes from "./routes/food.routes.js";
app.use("/api/v1/user/",foodRoutes);

//user routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user/",userRoutes);

//order routes
import orderRoutes from "./routes/order.routes.js";
app.use("/api/v1/user/",orderRoutes);

//cart item routes
import cartItemRoutes from "./routes/cartItems.routes.js";
app.use("/api/v1/user/",cartItemRoutes);
export default app;
