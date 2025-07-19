import { injectable } from "inversify";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { UserModel, IUserDocument } from "../database/models/UserModel";
import { IUser } from "../../domain/entity/User";
import { Types } from "mongoose";

@injectable()

export class UserRepository implements IUserRepository {
    async getAllUsers(searchQuery: string, limit: number, pageNumber: number): Promise<{ users: IUserDocument[]; total: number}> {
        const filter: any = {
            role: { $ne: "admin" },
        };
        if (!searchQuery === undefined) {
            filter.$or = [
                { username: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } },
            ];
        }
        const skip = (pageNumber - 1) * limit;
        const [users, total] = await Promise.all([
            UserModel.find(filter).skip(skip).limit(limit),
            UserModel.countDocuments(filter)
        ]);

        // console.log("Users data from the repository:", users)
        return { users, total }
    }

    async findByEmail(email: string): Promise<IUserDocument | null> {
        return await UserModel.findOne({ email });
    }

    async createUser(user: { username:string, email:string, password:string, image:string, role: string, status:boolean }): Promise<IUserDocument> {
        const newUser = new UserModel(user)
        return await newUser.save();
    }

    async updateUser(userId: string, updatedData: Partial<IUser>): Promise<Omit<IUser, "password"> | null> {
        return await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        console.log("User id at the delete user repository:", userId);
        return await UserModel.findByIdAndDelete(userId);
    }

    async udpateUserStatus(userId: string): Promise<IUserDocument | null> {
        const user = await UserModel.findById(new Types.ObjectId(userId));
        // console.log("user data at repo:", user)
        if (!user) return null;
        user.status = !user.status;
        await user.save();
        return user.toObject()
    }

    async findById(userId:string):Promise<IUserDocument| null> {
        const user = await UserModel.findById(new Types.ObjectId(userId));
        return user
    }

    async userProfile(userId: string): Promise<Omit<IUserDocument, "password"> | null> {
        const user = await UserModel.findById(userId);
        return user
    }
}

