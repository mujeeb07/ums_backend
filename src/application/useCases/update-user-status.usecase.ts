import { inject, injectable } from "inversify";
import { ToggleUserStatusUseCase } from "../../domain/usecases/IUserUseCases";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { IUser } from "../../domain/entity/User";


@injectable()
export class UpdatUserStatus implements ToggleUserStatusUseCase {
    constructor(
        @inject(TYPES.IUserRepository) private userRepo:IUserRepository
    ){}
    async execute(userId: string): Promise<IUser> {
        const user = await this.userRepo.findById(userId);
        // console.log("User details at the useCase:", user)
        if(!user) throw new Error("User not found.");
        const updatedUser = await this.userRepo.udpateUserStatus(userId);
        if(!updatedUser) throw new Error("failed to update user.");
        return {
            ...updatedUser,
            _id:String(updatedUser._id)
        }
    }
}