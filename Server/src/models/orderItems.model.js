import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    itemId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
    }],
    // quantity: {
    //     type: Number,
    //     required: true,
    // },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,         
    },
    street: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "delivered","processing", "cancelled"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "razorpay"],
        default: "cod",
    },
},{timestamps:true});
const OrderItems = mongoose.model("OrderItems", orderItemsSchema);
export default OrderItems