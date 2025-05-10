import Cart from "../models/cart.model.js";

const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({
                message:"UserId is required to add item to cart!"
            })
        }
        // console.log("userId:",userId);
        const {itemIds,quantity} = req.body;
        if(!itemIds || !quantity){
            return res.status(400).json({
                message:"ItemId and Quantity are required for add item to cart!"
            })
        }
        let cart = await Cart.findOne({userId});
        // console.log("cart:",cart);
        if(cart){
            const existingCartItem = cart.cartItems.findIndex(item=>item.itemIds.toString()===itemIds);
            if(existingCartItem !==-1){
                cart.cartItems[existingCartItem].quantity += quantity;
            }else{
                cart.cartItems.push({itemIds,quantity});
            }
            await cart.save();
        }else{
           cart = await Cart.create({
                userId,
                cartItems:[{itemIds,quantity}]
            })
        }
        return res.status(200).json({
            message:"Item added to cart successfully!",
            success:true,
            data:cart
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false   
        })
    }
}

//remove item from cart
const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const itemIds = req.body.itemIds;
        if(!userId || !itemIds){
            return res.status(400).json({
                message:"UserId and ItemIds are required to remove item from cart!"
            })
        }
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(400).json({
                message:"Cart not found!",
                success:false
            })
        }
        const existingCartItem =  cart.cartItems.findIndex(item => item.itemIds.toString() === itemIds);
        if(existingCartItem === -1){
            return res.status(400).json({
                message:"Item not found in cart!",
                success:false
            })
        }
        if(cart.cartItems[existingCartItem].quantity > 1){
            cart.cartItems[existingCartItem].quantity -= 1;
        }else{
            cart.cartItems.splice(existingCartItem,1);
        }
        await cart.save();
        return res.status(200).json({
            message:"Item removed from cart successfully!",
            success:true,
            data:cart
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false
        })
    }
}
//get single User cart items
const getSingleUserCartItems = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({
                message:"UserId is required to get all cart items!"
            })
        }
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(400).json({
                message:"CartItems  not found!",
                success:false
            })
        }
        return res.status(200).json({
            message:"All cart items found successfully!",
            success:true,
            data:cart
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false
        })  
    }
}
//get all cart items
const getAllCartItems = async (req, res) => {
    try {
        const cart = await Cart.find().populate("cartItems.itemIds");
        if(!cart){
            return res.status(400).json({
                message:"CartItems  not found!",
                success:false
            })  
        }
        return res.status(200).json({
            message:"All cart items found successfully!",
            success:true,
            data:cart
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false
        })  
    }
}


export {
    addToCart,
    removeItemFromCart,
    getAllCartItems,
    getSingleUserCartItems
}