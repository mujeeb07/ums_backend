import { Container } from "inversify";
import { TYPES } from "./types";
import { IUserRepository } from "../domain/interfaces/IUserRespository";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { LoginUser } from "../application/useCases/login.usecase";
import { 
    DeleteUserUseCase,
    GetAllUsersUseCase,
    LoginUserUseCase, 
    RegisterUserUseCase, 
    ToggleUserStatusUseCase, 
    UpdateUserUseCase, 
    UserProfileUseCase} from "../domain/usecases/IUserUseCases";
import { RegisterUser } from "../application/useCases/register.usecase";
import { UpdateUser } from "../application/useCases/update-user.usecase";
import { UpdatUserStatus } from "../application/useCases/update-user-status.usecase";
import { UserProfile } from "../application/useCases/user-profile.useCase";
import { GetAllUsers } from "../application/useCases/get-all-user.usecase";
import { DeleteUser } from "../application/useCases/delete-user.usercase";

const container = new Container();

//repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

//usecases
container.bind<RegisterUserUseCase>(TYPES.RegisterUser).to(RegisterUser);
container.bind<LoginUserUseCase>(TYPES.LoginUserCase).to(LoginUser);
container.bind<UpdateUserUseCase>(TYPES.UpdateUserUseCases).to(UpdateUser);
container.bind<ToggleUserStatusUseCase>(TYPES.ToggleUserStatusUseCase).to(UpdatUserStatus);
container.bind<UserProfileUseCase>(TYPES.UserProfileUseCase).to(UserProfile);
container.bind<GetAllUsersUseCase>(TYPES.GetAllUsersUseCase).to(GetAllUsers);
container.bind<DeleteUserUseCase>(TYPES.DeleteUserUseCase).to(DeleteUser);

export { container }