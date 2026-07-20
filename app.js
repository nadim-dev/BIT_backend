import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/mongoose.js";

try{
await connectDB();
const app=express();

const PORT=4000

app.use(express.json());

app.use(cors());

app.use("/auth", authRoutes);

app.listen(PORT,()=>{
    console.log("server is running on http://localhost:4000");
})

}catch(err){
    console.log(err.message);
}