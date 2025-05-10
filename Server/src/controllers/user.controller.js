import User from "../models/user.model.js";
import { uploadOnCloudinary, deletefromCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, address, city, state, country, postalCode, role } = req.body;
        if (!name || !email || !phone || !password || !address || !city || !state || !country || !postalCode || !role) {
            return res.status(400).json({
                message: "All these fields are required",
                success: false
            })
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: "User Already Exists.",
                success: false
            })
        }

        if (!req.files || !req.files.avatar || !req.files.coverImage) {
            return res.status(400).json({
                message: "avatar and coverImage is required",
                success: false
            })
        }
        // console.log("req.file:", req.files);
        // if(req.files.avatar.originalname === req.files.coverImage.originalname){
        //     return res.status(400).json({
        //         message: "Avatar and Cover Image cannot be same",
        //         success: false
        //     })
        //   }
        const avatarLocalPath = await uploadOnCloudinary(req.files?.avatar[0].path);
        // console.log("avatarLocalPath:", avatarLocalPath);
        if (!avatarLocalPath) {
            return res.status(400).json({
                message: "Something went wrong while uploading image on cloudinary",
                success: false
            })
        }
        const coverImageLocalPath = await uploadOnCloudinary(req.files?.coverImage[0].path);
        // console.log("coverImageLocalPath:", coverImageLocalPath);
        if (!coverImageLocalPath) {
            return res.status(400).json({
                message: "Something went wrong while uploading image on cloudinary",
                success: false
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        // console.log("hashedPassword:", hashedPassword);
        if (!hashedPassword) {
            return res.status(400).json({
                message: "Something went wrong while hashing password",
                success: false
            })
        }

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            address,
            city,
            state,
            country,
            postalCode,
            role,
            avatar: avatarLocalPath.url,
            coverImage: coverImageLocalPath.url || " "
        });
        // console.log("user:", user);
        if (!user) {
            return res.status(400).json({
                message: "Something went wrong while creating user",
                success: false
            })
        }
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            data: user
        })
    } catch (error) {
        if (avatarLocalPath) {
            await deletefromCloudinary(avatarLocalPath.public_id);
        }
        if (coverImageLocalPath) {
            await deletefromCloudinary(coverImageLocalPath.public_id);
        }
        return res.status(500).json({
            message: "Something went wrong while creating user" + error.message,
            success: false
        })
    }
}
// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All These Feilds are required!",
                success: false
            })
        }
        const user = await User.findOne({email});
        // console.log("user:", user);
        if (!user) {
            return res.status(400).json({
                message: "User Not Found!",
                success: false
            })
        }
        const comparedPassword = await bcrypt.compare(password, user.password);
        // console.log("comparedPassword:", comparedPassword);
        if (!comparedPassword) {
            return res.status(400).json({
                message: "Invalid User Password.Please Enter Correct Password!",
                success: false
            })
        }
       const token = jwt.sign({ id: user._id, name: user.name,email: user.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "365d"
        }); 

        return res.status(200).json({
            message: "User Logged In Successfully!",
            success: true,
            token,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error" + error.message,
            success: false
        })
    }
}


//find specific user
const singleUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({
                message:"userId is required to find the user detail!",
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
        return res.status(200).json({
            message:"User Found Successfully!",
            success:true,
            data:user
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false
        })
    }
}
//update user detail
const updatedUserDetails = async(req,res)=>{
    try {
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({
                message:'UserId is required to Update the user details!',
                success:false
            })
        }
        const user = await User.findByIdAndUpdate(userId,req.body,{new:true});
          if(!user){
            return res.status(400).json({
                message:"Something Went Wrong While Updating The User Details!",
                success:false
            });
          }
     return res.status(200).json({
        message:"User Details Updated Successfully!",
        success:true,
        data:user
     })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false
        })
    }
}

//update cover image
const updateUserCoverImage = async(req,res)=>{
    try {
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({
                message:"userId is required to update the cover image!",
                success:false
            })
        }
        
        const coverImageLocalPath = await uploadOnCloudinary(req.file.path);
        if(!coverImageLocalPath){
            return res.status(400).json({
                message:"Cover Image is missing!",
                success:false
            })
        }
        console.log("coverImage:"+coverImageLocalPath);

        const user = await User.findByIdAndUpdate(
            userId,{
            $set:{coverImage:coverImageLocalPath.secure_url}
        },
            {new:true}
            );
        if(!user){
            return res.status(400).json({
                message:"Something Went Wrong While Updating The Cover Image!",
                success:false
            })
        }
        return res.status(200).json({
            message:"Cover Image Updated Successfully!",
            success:true,
            data:user
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false
        })
    }
}

//get all users
const allUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -__v");
        if(!users){
            return res.status(400).json({
                message:"Users Not Found!",
                success:false
            })      
        }
        return res.status(200).json({
            message:"All Users Found Successfully!",
            success:true,
            data:users
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error "+error.message,
            success:false
        })
    }
}
export {
    registerUser,
    loginUser,
    singleUser,
    updatedUserDetails,
    updateUserCoverImage,
    allUsers
}