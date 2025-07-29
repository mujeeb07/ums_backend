import { IUser } from "../entity/User";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";

export interface IUserRepository {
    findByEmail(email: string): Promise<IUserDocument | null>;
    createUser(user: { username:string, email:string, password:string, image:string, role: string, status:boolean }): Promise<IUserDocument>;
    getAllUsers(searchQuery: string, limit: number, pageNumber: number): Promise<{ users: IUserDocument[]; total: number}>;
    updateUser(userId: string, updatedData: Partial<IUser>): Promise<Omit<IUser, "password"> | null>;
    deleteUser(userId: string): Promise<IUser | null>;
    udpateUserStatus(userId: string): Promise<IUserDocument | null>;
    findById(userId: string): Promise<IUserDocument | null> 
    userProfile(userId: string): Promise<Omit<IUserDocument, "password"> | null>;
    findByEmailExcludingUser(email: string, excludeUserId: string): Promise<IUser | null>
}