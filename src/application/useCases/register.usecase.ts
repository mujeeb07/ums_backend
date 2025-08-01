import { inject, injectable } from "inversify";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { TYPES } from "../../container/types";
import { IUser } from "../../domain/entity/User";
import { hashPassword } from "../../utils/matchPassword";
import { RegisterUserUseCase } from "../../domain/usecases/IUserUseCases";
import { ErrorHanlder } from "../../presentation/middleware/errorHandlingMiddleware";

@injectable()
export class RegisterUser implements RegisterUserUseCase{
    constructor(
        @inject(TYPES.IUserRepository) private userRepo: IUserRepository
    ) {}

    async execute(username:string, email:string, password:string, image:string, role: string, status:boolean ) :Promise<IUser>{
        const exsistingUser = await this.userRepo.findByEmail(email);
        if(exsistingUser) {
            throw new ErrorHanlder(409, "User already exist with this email");
        }

        const userData = {username,email,password,image,role,status } 
        const hashedPassword = await hashPassword(password)
       
        const createdUser = await this.userRepo.createUser({...userData,password:hashedPassword});
       
    return {
        _id:String(createdUser._id),
        username: createdUser.username,
        email: createdUser.email,
        password: hashedPassword,
        image: createdUser.image,
        role: createdUser.role ,
        status: createdUser.status 
    }
    }
}
