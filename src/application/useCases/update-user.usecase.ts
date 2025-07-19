import { inject, injectable } from "inversify";
import { UpdateUserUseCase } from "../../domain/usecases/IUserUseCases";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { IUser } from "../../domain/entity/User";

@injectable()
export class UpdateUser implements UpdateUserUseCase {
    constructor (
        @inject(TYPES.IUserRepository) private userRepo: IUserRepository
    ){}
    async execute(userId:string, username: string, email: string, image: string, status: boolean): Promise<Omit<IUser, "password">> {
        const userData = await this.userRepo.findById(userId)

        if(!userData) throw new Error("User not found.");
        const updatedData = {
            username,
            email,
            image,
            status
        }
        const user = await this.userRepo.updateUser(userId, updatedData);

        if(!user) throw new Error("error") 
        return user
    }

}