// import { inject, injectable } from "inversify";
// import { TYPES } from "../../container/types";
// import { IUserRepository } from "../../domain/interfaces/IUserRespository";
// import { DeleteUserUseCase } from "../../domain/usecases/IUserUseCases";


// @injectable()
// export class DeleteUser implements DeleteUserUseCase {
//     constructor(
//         @inject(TYPES.DeleteUserUseCase) private userRepo: IUserRepository
//     ) { }
    
//     async execute(userId: string): Promise<void> {
//         console.log("Delete user execution....")
//         if (!userId) throw new Error("User id not found");
//         await this.userRepo.deleteUser(userId)
//         return;
//     }
// }

import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { DeleteUserUseCase } from "../../domain/usecases/IUserUseCases";
import { IUser } from "../../domain/entity/User";

@injectable()
export class DeleteUser implements DeleteUserUseCase {
    constructor(
        @inject(TYPES.IUserRepository) private userRepo: IUserRepository
    ) { }

    async execute(userId: string): Promise<IUser> {
        console.log("userId value:", userId);
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid user ID provided");
        }
        
        if (!userId) throw new Error("User id not found");
        const user = await this.userRepo.deleteUser(userId);
        if(!user) throw new Error("User not found");
        console.log("Deleted User:", user)
        return user;
    }
}