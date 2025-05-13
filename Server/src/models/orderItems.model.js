import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

const orderItemsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [orderItemSchema],
  itemId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true
  }],
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  street: {
    type: String,
    default: ""
  },
  landmark: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Delivered", "Cancelled"],
    default: "Pending"
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending"
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "razorpay"],
    default: "cod"
  },
  razorpayOrderId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  }
}, { timestamps: true });

const OrderItems = mongoose.model("OrderItems", orderItemsSchema);

export default OrderItems;
