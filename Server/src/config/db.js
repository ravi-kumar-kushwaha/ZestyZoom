import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();    
const ConnectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        console.log("Connection host:",connection.connection.host);
    } catch (error) {
        console.log("Something went wrong while connecting to database:"+error.message);
    }
}

export default ConnectDB