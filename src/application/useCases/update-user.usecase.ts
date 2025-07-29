import { inject, injectable } from "inversify";
import { UpdateUserUseCase } from "../../domain/usecases/IUserUseCases";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { IUser } from "../../domain/entity/User";

@injectable()
export class UpdateUser implements UpdateUserUseCase {
    constructor (
        @inject(TYPES.IUserRepository) private userRepo: IUserRepository
    ) { }
    
    async execute(
        userId: string,
        username: string,
        email: string,
        image: string,
        status: boolean
    ): Promise<Omit<IUser, "password">> {

        const exsistingUser = await this.userRepo.findByEmailExcludingUser(email, userId);
        if (exsistingUser) {
            throw new Error("Email already exists for another user");
        }

        const currentUser = await this.userRepo.findById(userId);
        if (!currentUser) throw new Error("User not found");

        const updateData = {
            username,
            email,
            image,
            status
        }

        const updatedUser = await this.userRepo.updateUser(userId, updateData);
        if (!updatedUser) {
            throw new Error("Error update user");
        }
        return updatedUser
        // const userData = await this.userRepo.findById(userId);
        // console.log("UPDATE USER ID:", userId)
        // // const allUsers = await this.userRepo.getAllUsers()
        // if(!userData) throw new Error("User not found.");
        // const updatedData = {
        //     username,
        //     email,
        //     image,
        //     status
        // }
        // const existingEmail = await this.userRepo.findByEmail(email)
        // // if (existingEmail) {
        // //     throw new Error("Email is already used by another account.");
        // //   }
        // const user = await this.userRepo.updateUser(userId, updatedData);

        // if(!user) throw new Error("error") 
        // return user
    }

}