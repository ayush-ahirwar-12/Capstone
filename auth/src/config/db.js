import mongoose from "mongoose";

async function connectDB(){
    await mongoose.connect(process.env.AUTH_MONGO_URI).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.error("Error connecting to MongoDB", err);
    })
}

export default connectDB;