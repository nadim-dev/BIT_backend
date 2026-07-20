import { registerSchema } from "../validators/authValidator.js";
import User from "../models/userModel.js";
import { sanitize } from "../utils/sanitize.js";


export const registerUser = async (req, res) => {
  console.log("Register controller function is running");
  try{
  
  const { success, data, error} = registerSchema.safeParse(req.body);

  if (!success){
    console.log(error);
    return res.status(400).json({"message":"Invalid input"});
  }
  
  const {username,password,email}=sanitize(data);

    
 const user = await User.create({
  username,
  email,
  password
});
  
  return res.status(200).json({"message":"user registered successfully"});
  }catch(err){
    console.log(err);
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(409).json({success: false,message: "Email is already registered"});
    }

    return res.status(500).json({"message":"Internal Server Error"})
  }
};

export const loginUser = async (req, res) => {
  // ...
};
