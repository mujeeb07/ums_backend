import { inject, injectable } from "inversify";
import { UpdateUserUseCase } from "../../domain/usecases/IUserUseCases";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { IUser } from "../../domain/entity/User";
import { ErrorHanlder } from "../../presentation/middleware/errorHandlingMiddleware";

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
            throw new ErrorHanlder(409, "Email already exists for another user");
        }

        const currentUser = await this.userRepo.findById(userId);
        if (!currentUser) throw new ErrorHanlder(404, "User not found");

        const updateData = {
            username,
            email,
            image,
            status
        }

        const updatedUser = await this.userRepo.updateUser(userId, updateData);
        if (!updatedUser) {
            throw new ErrorHanlder(500, "Error update user");
        }
        return updatedUser
    }

}