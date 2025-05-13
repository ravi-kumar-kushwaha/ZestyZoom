import Razorpay from "razorpay"
import Cart from "../models/cart.model.js";
import OrderItems from "../models/orderItems.model.js";
import Food from "../models/food.model.js";
import crypto from "crypto";
import User from "../models/user.model.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

//place order using razorpay
const placeOrder = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                message: "User authentication required",
                success: false
            });
        }

        const { 
            itemId, 
            quantity,
            name, 
            email,
            mobile, 
            address,
            street, 
            landmark,
            state, 
            country,
            postalCode, 
            paymentMethod 
        } = req.body;

       
        if (!itemId || !name || !email || !mobile || !address || 
            !state || !country || !postalCode || !paymentMethod) {
            return res.status(400).json({
                message: "Required fields are missing",
                success: false
            });
        }

       
        const cartItemIds = itemId.map(item => item.cartItemIds);
        
   
        const foodItems = await Food.find({ _id: { $in: cartItemIds } });
        
        if (!foodItems || foodItems.length === 0) {
            return res.status(404).json({
                message: "Food items not found",
                success: false
            });
        }

     
        let totalAmount = 0;
        const orderItems = foodItems.map((item, index) => {
            const itemQuantity = quantity[index] || 1;
            totalAmount += (item.discountedPrice * itemQuantity);
            
            return {
                foodId: item._id,
                name: item.name,
                price: item.discountedPrice,
                quantity: itemQuantity
            };
        });

        
        const order = new OrderItems({
            userId,
            items: orderItems,
            itemId: cartItemIds,
            price: totalAmount * 100, 
            name,
            email,
            mobile,
            address,
            street: street || "",
            landmark: landmark || "",
            state,
            country,
            postalCode,
            paymentMethod,
            orderStatus: paymentMethod === "cod" ? "Processing" : "Pending"
        });

        
        if (paymentMethod === "cod") {
            await order.save();
            
            await Cart.deleteMany({ userId });
            
            return res.status(200).json({
                message: "COD Order Placed Successfully!",
                success: true,
                data: order,
                orderId: order._id
            });
        }

        const options = {
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
            notes: {
                foodIds: cartItemIds.join(','),
                userId: userId.toString()
            }
        };

        const razorpayOrder = await razorpay.orders.create(options);
        
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        await Cart.deleteMany({ userId });

        const productDetails = foodItems.map((item, index) => {
            const itemQuantity = quantity[index] || 1;
            return {
                name: item.name,
                image: item.image,
                description: item.description,
                price: item.price,
                discountedPrice: item.discountedPrice,
                off: item.discountPercentage + "%",
                category: item.category,
                category2: item.category2,
                sizes: item.sizes,
                quantity: itemQuantity,
                totalPrice: item.discountedPrice * itemQuantity
            };
        });

        return res.status(200).json({
            message: "Order Placed Successfully!",
            success: true,
            data: order,
            orderId: order._id,
            checkoutId: razorpayOrder.id,
            product: productDetails
        });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({
            message: "Internal Server Error: " + error.message,
            success: false
        });
    }
};
// place order using case on delivery method
const placeCodOrder = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                message: "User authentication required",
                success: false
            });
        }

        const { 
            itemId, 
            quantity,
            name, 
            email,
            mobile, 
            address,
            street, 
            landmark,
            state, 
            country,
            postalCode 
        } = req.body;

        if (!itemId || !name || !email || !mobile || !address || 
            !state || !country || !postalCode) {
            return res.status(400).json({
                message: "Required fields are missing",
                success: false
            });
        }

        const cartItemIds = itemId.map(item => item.cartItemIds);
        
        const foodItems = await Food.find({ _id: { $in: cartItemIds } });
        
        if (!foodItems || foodItems.length === 0) {
            return res.status(404).json({
                message: "Food items not found",
                success: false
            });
        }

        let totalAmount = 0;
        const orderItems = foodItems.map((item, index) => {
            const itemQuantity = quantity[index] || 1;
            totalAmount += (item.discountedPrice * itemQuantity);
            
            return {
                foodId: item._id,
                name: item.name,
                price: item.discountedPrice,
                quantity: itemQuantity
            };
        });

        const order = new OrderItems({
            userId,
            items: orderItems,
            itemId: cartItemIds,
            price: totalAmount * 100,
            name,
            email,
            mobile,
            address,
            street: street || "",
            landmark: landmark || "",
            state,
            country,
            postalCode,
            paymentMethod: "cod",
            orderStatus: "Processing"
        });

        await order.save();
        
        await Cart.deleteMany({ userId });
        
        return res.status(200).json({
            message: "COD Order Placed Successfully!",
            success: true,
            data: order,
            orderId: order._id
        });
    } catch (error) {
        console.error("Error placing COD order:", error);
        return res.status(500).json({
            message: "Internal Server Error: " + error.message,
            success: false
        });
    }
};

//get keyId
const keyId = (req, res) => {
    return res.status(200).json({
        key: process.env.RAZORPAY_KEY_ID,
        success: true
    });
};

//verify payment
const verifyPayments = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                message: "Missing parameters for verification",
                success: false
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthenticated = razorpay_signature === expectedSignature;

        if (!isAuthenticated) {
            return res.status(400).json({
                message: "Payment verification failed: Invalid signature",
                success: false
            });
        }

        const order = await OrderItems.findOne({ razorpayOrderId: razorpay_order_id });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            });
        }

        order.razorpayPaymentId = razorpay_payment_id;
        order.orderStatus = "Processing";
        order.paymentStatus = "Paid";
        await order.save();

        return res.status(200).json({
            message: "Payment verified successfully",
            success: true,
            data: order
        });
    } catch (error) {
        console.error("Error during payment verification:", error);
        return res.status(500).json({
            message: "Internal Server Error: " + error.message,
            success: false
        });
    }
};

// find users orders
const userOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({
                message: "UserId is required to get all orders!",
                success: false
            });
        }
        const orders = await OrderItems.find({userId}).populate("userId","-cartItems -password -__v").populate("itemId","-_id -totalQuantity -sizes -__v").sort({createdAt:-1});
        if (!orders) {
            return res.status(400).json({
                message: "Orders Not Found!",
                success: false
            });
        }
        return res.status(200).json({
            message: "All Orders Found Successfully!",
            success: true,
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error " + error.message,
            success: false
        })
    }
}

const getSingleOrder = async (req, res) => {
    try {
        const userId = req.user?._id;
        if(!userId){
            return res.status(400).json({
                message:"you need to be logged in to get the single food item!",
                success:false
            });
        }
        const orderId = req.params.orderId;
        console.log("orderid",orderId);
        if(!orderId){
            return res.status(400).json({
                message:"orderId is required to get the single food item!",
                success:false
            });
        }
        const getSingleFoodItem = await OrderItems.findOne({userId:userId,_id:orderId}).populate("userId","-cartItems -password -__v").populate("itemId","-_id -totalQuantity -sizes -__v").sort({createdAt:-1}).lean(userId);
        if(!getSingleFoodItem){
            return res.status(400).json({
                message:"something goin wrong while geting the single food item!",
                success:false
            })
        }
        return res.status(200).json({
            message:"Food Item Fetched Successfully!",
            success:true,
            data:getSingleFoodItem
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Srever error:"+error.message,
            success:false
        })
    }
}

const updateOrderItem = async(req,res)=>{
    try {
        const userId = req.user?._id;
        if(!userId){
            return res.status(400).json({
                message:"you are not authorized to get the single food item!",
                success:false
            });
        }
        const orderId = req.params.orderId;
        console.log("orderid",orderId);
        if(!orderId){
            return res.status(400).json({
                message:"orderId is required to get the single food item!",
                success:false
            });
        }
        const order = await OrderItems.findByIdAndUpdate(orderId,req.body,{new:true});
        if(!order){
            return res.status(400).json({
                message:"Something went wrong while updating the foodItem!",
                success:false
            })
        }
        return res.status(200).json({
            message:"FoodItem Updated Successfully!",
            success:true,
            data:order
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Srever error:"+error.message,
            success:false
        })
    }
}

const deleteOrderItem = async(req,res)=>{
    try {
        const userId = req.user?._id;
        if(!userId){
            return res.status(400).json({
                message:"you are not authorized to get the single food item!",
                success:false
            });
        }
        const user = await User.findById(userId);
        if(!user.role === "admin"){
            return res.status(400).json({
                message:"you are not authorized to delete the ordered items!",
                success:false
            })
        }
        const orderId = req.params.orderId;
        console.log("orderid",orderId);
        if(!orderId){
            return res.status(400).json({
                message:"orderId is required to get the single food item!",
                success:false
            });
        }
        const order = await OrderItems.findByIdAndDelete(orderId);
        if(!order){
        return res.status(400).json({
            message:"something went wrong while deleting the order item!",
            success:false
        })
        }
        return res.status(200).json({
            message:"Order Deleted Successfully!",
            success:true,
            data:order
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Srever error:"+error.message,
            success:false
        })
    }
}

const allOrders = async(req,res)=>{
    try {
        const userId = req.user?._id;
        if(!userId){
            return res.status(400).json({
                message:"UserId is required to get all orders!",
                success:false
            });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User Not Found!",
                success:false
            });
        }
        if(user.role !== "admin"){
            return res.status(400).json({
                message:"You are not authorized to get all orders!",
                success:false
            });
        }   
        const orders = await OrderItems.find().populate("userId","-cartItems -password -__v").populate("itemId","-_id -totalQuantity -sizes -__v").sort({createdAt:-1});
        if(!orders){
            return res.status(400).json({
                message:"Orders Not Found!",
                success:false
            }); 
        }
        return res.status(200).json({
            message:"All Orders Found Successfully!",
            success:true,
            data:orders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false
        });
    }
}

export {
    placeOrder,
    placeCodOrder,
    keyId,
    verifyPayments,
    userOrders,
    getSingleOrder,
    updateOrderItem,
    deleteOrderItem,
    allOrders
}





