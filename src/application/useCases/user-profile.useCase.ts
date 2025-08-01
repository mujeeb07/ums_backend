import { inject, injectable } from "inversify";
import { UserProfileUseCase } from "../../domain/usecases/IUserUseCases";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { ErrorHanlder } from "../../presentation/middleware/errorHandlingMiddleware";

@injectable()
export class UserProfile implements UserProfileUseCase {
    constructor(
        @inject(TYPES.IUserRepository) private userRepo: IUserRepository
    ) { }
    async execute(userId: string): Promise<Omit<IUserDocument, "password">> {
        const userData = await this.userRepo.userProfile(userId);
        // console.log(userData,"data")
        if (!userData) throw new ErrorHanlder(404, "user not found");
        return userData
    }
}