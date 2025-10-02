import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://FullStack:Itsmeneha17@cluster0.csrzauf.mongodb.net/Food-Delivery').then(()=>console.log("Database Connected Successfully"));
}

