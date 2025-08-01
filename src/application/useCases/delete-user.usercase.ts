import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { DeleteUserUseCase } from "../../domain/usecases/IUserUseCases";
import { IUser } from "../../domain/entity/User";
import { ErrorHanlder } from "../../presentation/middleware/errorHandlingMiddleware";
@injectable()
export class DeleteUser implements DeleteUserUseCase {
    constructor(
        @inject(TYPES.IUserRepository) private userRepo: IUserRepository
    ) { }

    async execute(userId: string): Promise<IUser> {
        console.log("userId value:", userId);
        if (!userId || typeof userId !== 'string') {
            throw new ErrorHanlder(500, "Invalid user ID provided");
        }
        
        if (!userId) throw new ErrorHanlder(500, "User id not found");
        const user = await this.userRepo.deleteUser(userId);
        if(!user) throw new ErrorHanlder(404, "User not found");
        console.log("Deleted User:", user)
        return user;
    }
}