import { inject, injectable } from "inversify";
import { UserProfileUseCase } from "../../domain/usecases/IUserUseCases";
import { TYPES } from "../../container/types";
import { IUser } from "../../domain/entity/User";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";


@injectable()
export class UserProfile implements UserProfileUseCase {
    constructor(
        @inject(TYPES.IUserRepository) private userRepo: IUserRepository
    ) { }
    async execute(userId: string): Promise<Omit<IUserDocument, "password">> {
        const userData = await this.userRepo.userProfile(userId);
        // console.log(userData,"data")
        if (!userData) throw new Error("user not found");
        return userData
    }
}