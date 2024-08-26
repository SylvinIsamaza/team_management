import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secret = process.env.SECRET_KEY
//function to generate token
export function generateAuthToken(payload) {
  const token = jwt.sign(payload, secret, { expiresIn: '30d' });
  return token;
}
// Function to validate a JWT token
export function validateAuthToken(token) {
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
}