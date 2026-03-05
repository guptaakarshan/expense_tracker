import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
};
//register a user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


//to get login user details
export const getLoginUser=async(req,res)=>{
  try{
    const user=await User.findById(req.user.id).select("name email");
    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"User details fetched successfully",
      user
    })
  }catch(error){
    console.error(error);
    res.status(500).json({
      success:false,
      message:"Server error"
    })
  }
}


//update user details
export const updateUser=async(req,res)=>{
  const {name,email}=req.body;
  if(!name||!email || !validator.isEmail(email)){
    return res.status(400).json({
      success:false,
      message:"Please fill all the fields"
    })
}

try{
  const exists=await User.findOne({email,_id:{$ne:req.user._id}});

  if(exists){
    return res.status(400).json({
      success:false,
      message:"Email already exists"
    })
  }

  const user=await User.findByIdAndUpdate(
    req.user.id,
    {name,email},
    {new:true, runValidators:true,select:"name email"}
  );
  res.status(200).json({
    success:true,
    message:"User details updated successfully",
    user
  })
}catch(error){
  console.error(error);
  res.status(500).json({
    success:false,
    message:"Server error"
  })
}
}

//to change user password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide old and new password",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};