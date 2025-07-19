import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { IUser } from "../entity/User"; 

export interface LoginUserUseCase {
  execute(email: string, password: string): Promise<IUser>;
}
export interface RegisterUserUseCase {
  execute( username:string, email:string, password:string, image:string, role: string, status:boolean ):Promise<IUser>
}

export  interface UpdateUserUseCase {
  execute(userId:string,username: string, email: string, image: string, status: boolean): Promise<Omit<IUser, "password">>
}

export interface ToggleUserStatusUseCase {
  execute(userId: string): Promise<IUser>
}

export interface GetAllUsersUseCase {
  execute(searchQuery: string, pageNumber: number, limit: number): Promise<{ users: Omit<IUserDocument[], "password">; total: number }>;
} 

export interface DeleteUserUseCase {
  execute(userId: string): Promise<IUser>;
}

export interface UserProfileUseCase {
  execute(userId: string): Promise<Omit<IUserDocument, "password">>;
}
