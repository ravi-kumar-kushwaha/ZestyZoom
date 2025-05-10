import Food from "../models/food.model.js"
import { deletefromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
const insertAllFoods = async (req, res) => {
    try {
        const {name,price,description,image} = req.body;
        if(!name || !price || !description || !image){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            });
        }
        const allFoodItem = await Food.insertMany({
            name,
            price,
            description,
            image
        });
        if(!allFoodItem){
            return res.status(400).json({
                message:"Something went wrong while inserting all food items",
                success:false
            });
        }
        return res.status(200).json({
            message:"All food items added successfully",
            success:true,
            data:allFoodItem
        });
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong while inserting all food items: "+error.message,
            success:false
        })
    }
}

//create food item
const createFoofItem = async(req,res)=>{
    try {
        const {name,price,description} = req.body;
        if(!name || !price || !description){
            return res.status(400).json({
                message:"All These Feilds are Required",
                success:false
            })
        }
      if(!req.file){
        return res.status(400).json({
            message:"Image is required to create food item",
            success:false
        })
      }
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if(!cloudinaryResponse){
            return res.status(400).json({
                message:"Something went wrong while uploading image on cloudinary",
                success:false
            })
        }
        const food = await Food.create({
            name,
            price,
            description,
            image:cloudinaryResponse.secure_url
        })
        if(!food){
            return res.status(400).json({
                message:"Something went wrong while creating food item",
                success:false
            })
        }
        return res.status(200).json({
            message:"Food item created successfully",
            success:true,
            data:food
        })
    } catch (error) {
        if(image){
            await deletefromCloudinary(image.public_id);
        }
        return res.status(500).json({
            message:"Something went wrong while creating food item: "+error.message,
            success:false   
        })
    }
}
//get all food items
const getAllFoodItems = async (req, res) => {
    try {
        const food = await Food.find();
        if (food) {
            return res.status(200).json({
                message:"All food items fetched successfully",
                success:true,
                data:food
            }); 
        } else {
            return res.status(400).json({
                message:"Something went wrong while fetching all food items",
                success:false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error: "+error.message,
            success:false
        })
    }
}

//get food item by id
const getFoodItemById = async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findById(foodId);
        if (food) {
            return res.status(200).json({
                message:"Food item fetched successfully",
                success:true,
                data:food
            }); 
        } else {
            return res.status(400).json({
                message:"Something went wrong while fetching food item",
                success:false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error: "+error.message,
            success:false
        })          
    }   
}
//update foodItems 
const updateFoodItems = async (req, res) => {
    try {
        const foodId = req.params.id;
        if(!req.file){
            return res.status(400).json({
                message:"Image is required",
                success:false
            })  
        }
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if(!cloudinaryResponse){
            return res.status(400).json({
                message:"Something went wrong while uploading image on cloudinary",
                success:false
            })
        }
        req.body.image = cloudinaryResponse.secure_url;
        const food = await Food.findByIdAndUpdate(foodId,req.body,{new:true});
        if (food) {
            return res.status(200).json({
                message:"Food item updated successfully",
                success:true,
                data:food
            }); 
        } else {
            return res.status(400).json({
                message:"Something went wrong while updating food item",
                success:false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error: "+error.message,
            success:false       
        })
    }
}

const deleteFoodItem = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({
                message:"userId is required to delete the food item!",
                success:false
            })
        }
        const foodId = req.params.foodId;

        if (!foodId) {
            return res.status(400).json({
                message: "foodId is required to delete the food item!",
                success: false
            });
        }

        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({
                message: "Food item not found",
                success: false
            });
        }

        // console.log("food:", food);

        // const publicId = food?.image?.public_id;
        // console.log("publicId:", publicId);
        // if (!publicId) {
        //     return res.status(400).json({
        //         message: "Public_id is required to delete the image from Cloudinary",
        //         success: false
        //     });
        // }

        // const cloudinaryResponse = await deletefromCloudinary(image?.public_id);
        // if (!cloudinaryResponse) {
        //     return res.status(400).json({
        //         message: "Something went wrong while deleting image from Cloudinary",
        //         success: false
        //     });
        // }

        const deletedFoodItem = await Food.findByIdAndDelete(foodId); 
        if (deletedFoodItem) {
            return res.status(200).json({
                message: "Food item deleted successfully",
                success: true,
                data: deletedFoodItem
            });
        } else {
            return res.status(400).json({
                message: "Something went wrong while deleting food item",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error: " + error.message,
            success: false
        });
    }
};

//create another food item
const addFoodItem = async (req, res) => {
    try {
        const {
            name, price, description, restaurantId, totalQuantity,
            discountPercentage, category, category2
        } = req.body;

         // Parse the 'sizes' field if it comes as a string
        //  const sizes = typeof req.body.sizes === 'string' ? JSON.parse(req.body.sizes) : req.body.sizes;
        // Validation for required fields
        if (!name || !price || !description || !totalQuantity || !discountPercentage || !category || !category2) {
            return res.status(400).json({
                message: "All these fields are required",
                success: false
            });
        }

        // Validate sizes (optional, depending on your requirements)
        // if (!sizes || sizes.length === 0) {
        //     return res.status(400).json({
        //         message: "Sizes are required",
        //         success: false
        //     });
        // }

        // Check if file (image) is uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "Image is required to create food item",
                success: false
            });
        }

        // Upload image to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse) {
            return res.status(400).json({
                message: "Something went wrong while uploading image to Cloudinary",
                success: false
            });
        }

        // Calculate the discount price
        const discount = (discountPercentage * price) / 100;
        const discountedPrice = price - discount;

        // Create the food item in the database
        const food = await Food.create({
            name,
            price,
            description,
            restaurantId, 
            totalQuantity,
            discountPercentage,
            discountedPrice,
            category,
            category2,
            // sizes,
            image: cloudinaryResponse.secure_url, 
        });
     console.log("food:",food);
        if (!food) {
            return res.status(400).json({
                message: "Something went wrong while creating the food item",
                success: false
            });
        }

        // Return success response
        return res.status(200).json({
            message: "Food item created successfully",
            success: true,
            data: food
        });

    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({
            message: "Internal server error: " + error.message,
            success: false
        });
    }
};

//update foodItems details
const updateFoodItem = async (req, res) => {
    try {
        const foodId = req.params.id;
        let image;

        if (req.file && req.file.path) {
            try {
                image = await uploadOnCloudinary(req.file.path);
                if (!image) {
                    return res.status(500).json({
                        message: "Something went wrong while uploading image on Cloudinary",
                        success: false
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    message: "Something went wrong while uploading image on Cloudinary: " + (error.message || "Unknown error"),
                    success: false
                });
            }
        }

        const { name, description, price, discountPercentage, totalQuantity, category, category2 } = req.body;
        if (!price || !discountPercentage) {
            return res.status(400).json({
                message: "Price and discountPercentage are required",
                success: false
            });
        }
        const discount = (discountPercentage * price) / 100;
        const discountedPrice = price - discount;

        const updateData = {
            name,
            description,
            price,
            discountPercentage,
            discountedPrice,
            totalQuantity,
            category,
            category2
        };

        if (image) {
            updateData.image = image.secure_url;
        }

        const food = await Food.findByIdAndUpdate(foodId, updateData, { new: true });

        if (food) {
            return res.status(200).json({
                message: "Food item updated successfully",
                success: true,
                data: food
            });
        } else {
            return res.status(400).json({
                message: "Something went wrong while updating food item",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error: " + (error.message || "Unknown error"),
            success: false
        });
    }
};

export {
    insertAllFoods,
    getAllFoodItems,
    updateFoodItems,
    createFoofItem,
    deleteFoodItem,
    getFoodItemById,
    addFoodItem,
    updateFoodItem
}