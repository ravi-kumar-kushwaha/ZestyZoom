import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartItems: [
        {
            itemIds: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default:0
            }
        }
    ]
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
