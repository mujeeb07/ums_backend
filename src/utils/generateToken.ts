import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { id: userId, role: role }, 
    process.env.JWT_SECRET as string, 
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
};

export default generateToken;
