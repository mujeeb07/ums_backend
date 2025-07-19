import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../../../domain/entity/User";

export interface IUserDocument extends Document,Omit<IUser,"_id"> {}

const userSchema: Schema<IUserDocument> = new Schema(
    {
        username: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, default: "" },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        status: { type: Boolean, default: true }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
