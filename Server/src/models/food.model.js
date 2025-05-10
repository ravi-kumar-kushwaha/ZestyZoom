import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant" 
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number ,
        required:true, 
        validate: {
            validator: function(value) {
                return value <= this.price; 
            },
            message: "Discounted price cannot be more than the original price",
        },
    },
    discountPercentage:{
        type:Number,
        required:true,
        min: 0, 
        max: 100,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    totalQuantity:{
        type:Number
    },
    category:{
        type:String,
        enum: ["veg", "non-veg", "drinks", "snacks"],
        default:"veg"
    },
    category2:{
        type:String,
        enum: [
            "burgers & sandwiches", "pizza", "chinese & indo-chinese", "north indian", 
            "south indian", "biryani & rice", "fast food", "desserts & ice cream", 
            "street food", "healthy & salad", "sushi & japanese", "grilled & bbq", 
            "pasta & italian", "seafood", "drinks & beverages", "thalis & combo meals", 
            "tandoori & kebabs", "snacks & sides", "italian", "chinese", "indian", "french"
        ],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true
    }
},{timestamps:true});

const Food = mongoose.model("Food",foodSchema);
export default Food;