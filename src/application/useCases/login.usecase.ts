import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types";
import { IUserRepository } from "../../domain/interfaces/IUserRespository";
import { LoginUserUseCase } from "../../domain/usecases/IUserUseCases"; 
import { IUser } from "../../domain/entity/User";
import matchPasswords from "../../utils/matchPassword";
import { ErrorHanlder } from "../../presentation/middleware/errorHandlingMiddleware";

@injectable()
export class LoginUser implements LoginUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository
  ) {}

  async execute(inputEmail: string, inputPassword: string): Promise<IUser> {

    const user = await this.userRepo.findByEmail(inputEmail);
    if (!user) {
      throw new ErrorHanlder(404, "User not found");
    }

    const isMatch = await matchPasswords(inputPassword, user.password);
    if (!isMatch) {

      throw new ErrorHanlder(401, "Invalid password");
    }

    const {_id,username,email,password,image,role,status } = user
    
    return {
        _id:String(_id),
        username: username,
        email: email,
        password: password,
        image: image,
        role: role,
        status: status
    }
  }
}
