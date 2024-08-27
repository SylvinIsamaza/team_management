import { hash, compare } from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from "../models/user.js"
import dotenv from "dotenv"
dotenv.config()
export async function register (req, res,next) {
  const { username, password, role, teamId } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      teamId
    });
    await newUser.save();
    res.status(201).json({success:true, message: 'User registered successfully' });
  } catch (error) {
   next(error)
  }
}
export const createSuperAdmin = async (req, res,next) => {
  try {
    const { name, email, password,phone } = req.body;
    const hashedPassword = await hash(password, 10);
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const newSuperAdmin = new User({ name, email, password:hashedPassword ,phone,role:"superadmin"});
    await newSuperAdmin.save();
    
    
    res.status(201).json({success:true, message: 'Super Admin created successfully', superAdmin: newSuperAdmin });
  } catch (error) {
    
    next(error)
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({success:true, message: 'All fields are required' });
    }

    let user;
   
    user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({success:false, message: 'Invalid Email or password' });
    }
    const isMatch = await compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({success:false, message: 'Invalid Email or password' });
    }
    const token = Jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie("token",token)
    res.status(200).json({success:true, token, userId: user._id, role:user.role });
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, message: 'Internal server error', error });
  }
};
export const getUserInfo = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password -__v -resetPasswordLink');
    console.log(req.user)
    console.log(user)
    if (!user) {
      return res.status(401).json({success:true, message: 'Not authorized' });
    }
   
    res.status(200).json({success:true,user});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error', error });
  }
};




