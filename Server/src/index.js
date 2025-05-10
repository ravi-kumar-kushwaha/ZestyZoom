import app from "./app.js";
import dotenv from "dotenv";        

dotenv.config();
const port = process.env.PORT || 8080;
// start server
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})