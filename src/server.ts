import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRoutes from './presentation/routes/authRoutes';
import './container/inversify.config';
import adminRoutes from './presentation/routes/adminRoutes';
import userRoutes from './presentation/routes/userRoutes';
import cookieParser from "cookie-parser";
import cors from 'cors';
import types from "./types/express";

dotenv.config()

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.allowedOrigins,
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    
}))


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log('MongoDB error:', error));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
