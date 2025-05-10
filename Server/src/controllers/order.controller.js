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
const placeOrder = async (req, res) => {
    try {
        const userId = req.user?._id;
        // console.log("userId:", userId);
        if (!userId) {
            return res.status(400).json({
                message: "UserId is required to create order!",
                success: false
            })
        }
        const { itemId, name, email,
            mobile, address,
            street, landmark,
            state, country,
            postalCode, paymentMethod
        } = req.body;
        if (!itemId ||
            !name || !email ||
            !mobile || !address ||
            !street || !landmark ||
            !state || !country ||
            !postalCode || !paymentMethod
        ) {
            return res.status(400).json({
                message: "All fields are required!",
                success: false
            })
        }


       const cartItemIds = itemId.map((item) => item.cartItemIds);
    //    console.log("cartItemIds:", cartItemIds);
       const cartItems = await Food.find({ _id: { $in: cartItemIds } });
    //    console.log("cartItems:", cartItems);
       if(!cartItems){
        return res.status(400).json({
            message:"CartItems not found!",
            success:false
        })
       }

    const totalAmount = cartItems.reduce((acc, item, index) => {
        const quantity = itemId[index].quantity || 1;
        return acc + (item.discountedPrice * quantity);
    }, 0);
  

     const order = new OrderItems({
        userId,
        itemId:cartItemIds,
        // quantity:totalQuantity, 
        price:totalAmount*100,
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
     });
     
     const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `order_${order._id}`,
        payment_capture: 1,
        notes: {
            foodIds: cartItemIds,
            userId: userId
        }
     }
     const checkOut = await razorpay.orders.create(options);
    //  console.log("Razorpay Checkout ID:", checkOut.id);
     order.PaymentId = checkOut.id;
    //  console.log("PaymentId:",order.PaymentId);
     await order.save();
     // Delete the cart items after successful order
     await Cart.deleteMany({ userId });

     return res.status(200).json({
        message:"Order Placed Successfully!",
        success:true,
        data:order,
        orderId:order._id,
        checkoutId:checkOut.id,
        product:cartItems.map((item , index)=>{
            return {
                name:item.name,
                image:item.image,
                discription:item.description,
                price:item.price,
                discountedPrice:item.discountedPrice,
                off:item.discountPercentage+"%",
                category:item.category,
                category2:item.category2,
                sizes:item.sizes,
                quantity:itemId[index].quantity || 1,
                totalPrice:item.discountedPrice * (itemId[index].quantity || 1)
            }
        })
    }
    )
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false ,  
        })
    }
}


//key
const keyId = (req,res)=>{
    return res.status(200).json({
        key:process.env.RAZORPAY_KEY_ID,
        successs:true
    })
}


// verify payment
const verifyPayments = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;
console.log("req.body:", req.body);
        // Log incoming params to check if they are correct
        console.log("Received params for payment verification:");
        console.log("razorpay_order_id:", razorpay_order_id);
        console.log("razorpay_payment_id:", razorpay_payment_id);
        console.log("razorpay_signature:", razorpay_signature);

        // Check if all required fields are present
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                message: "Missing parameters for verification!",
                success: false
            });
        }

        // Construct the body to generate signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        console.log("Generated body string:", body);

        // Generate expected signature using the Razorpay secret key
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        // Log both expected and received signature
        console.log("Expected Signature:", expectedSignature);
        console.log("Received Signature:", razorpay_signature);

        // Compare signatures
        const isAuthenticated = razorpay_signature === expectedSignature;

        // If signatures don't match, fail the verification
        if (!isAuthenticated) {
            return res.status(400).json({
                message: "Payment Verification Failed!",
                success: false
            });
        }

        // Find the order from the database using the Razorpay order id
        const purchase = await OrderItems.findOne({ PaymentId: razorpay_order_id });

        if (!purchase) {
            return res.status(400).json({
                message: "Order Not Found!",
                success: false
            });
        }

        // Update the order with the payment ID
        purchase.razorpayPaymentId = razorpay_payment_id;
        await purchase.save();

        return res.status(200).json({
            message: "Payment Verified Successfully!",
            success: true,
            data: purchase
        });
    } catch (error) {
        console.error("Error during payment verification:", error);
        return res.status(500).json({
            message: "Internal Server Error " + error.message,
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
    keyId,
    verifyPayments,
    userOrders,
    getSingleOrder,
    updateOrderItem,
    deleteOrderItem,
    allOrders
}






