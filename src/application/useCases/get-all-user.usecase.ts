import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { GetAllUsersUseCase } from "../../domain/usecases/IUserUseCases";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { ErrorHanlder } from "../../presentation/middleware/errorHandlingMiddleware";

@injectable()
export class GetAllUsers implements GetAllUsersUseCase {
    constructor(
        @inject(TYPES.IUserRepository) private userRepo: IUserRepository
    ){}
    async execute(searchQuery: string, pageNumber: number, limit: number): Promise<{ users: Omit<IUserDocument[], "password">; total: number }> {
        // console.log(searchQuery,pageNumber,limit);
        const users = await this.userRepo.getAllUsers(searchQuery, limit, pageNumber);
        // console.log("Executed users:",users)
        if(!users) throw new ErrorHanlder(500, "Failed to fecth users.")
        return users;
    }
}