import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from "dotenv"

dotenv.config()

export const protect = async (req, res, next) => {
  let token = req.cookies.token;

  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
  
      
      let user = await User.findById(decoded.id)
      if (user != null) {
        req.user = { ...user, role: decoded.role }
        next();
      }
      else {
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
     
     
    
   
    
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'User role not authorized' });
    }
    next();
  };
};
