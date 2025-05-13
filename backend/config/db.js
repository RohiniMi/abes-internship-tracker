import mongoose from "mongoose";
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connection established Successfully.");
    } catch (error) {
        console.log("connection Error.");
    }
}
export default connectDB;