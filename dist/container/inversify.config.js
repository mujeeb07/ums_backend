"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
const UserRepository_1 = require("../infrastructure/repositories/UserRepository");
const login_usecase_1 = require("../application/useCases/login.usecase");
const register_usecase_1 = require("../application/useCases/register.usecase");
const update_user_usecase_1 = require("../application/useCases/update-user.usecase");
const update_user_status_usecase_1 = require("../application/useCases/update-user-status.usecase");
const user_profile_useCase_1 = require("../application/useCases/user-profile.useCase");
const get_all_user_usecase_1 = require("../application/useCases/get-all-user.usecase");
const delete_user_usercase_1 = require("../application/useCases/delete-user.usercase");
const container = new inversify_1.Container();
exports.container = container;
//repositories
container.bind(types_1.TYPES.IUserRepository).to(UserRepository_1.UserRepository);
//usecases
container.bind(types_1.TYPES.RegisterUser).to(register_usecase_1.RegisterUser);
container.bind(types_1.TYPES.LoginUserCase).to(login_usecase_1.LoginUser);
container.bind(types_1.TYPES.UpdateUserUseCases).to(update_user_usecase_1.UpdateUser);
container.bind(types_1.TYPES.ToggleUserStatusUseCase).to(update_user_status_usecase_1.UpdatUserStatus);
container.bind(types_1.TYPES.UserProfileUseCase).to(user_profile_useCase_1.UserProfile);
container.bind(types_1.TYPES.GetAllUsersUseCase).to(get_all_user_usecase_1.GetAllUsers);
container.bind(types_1.TYPES.DeleteUserUseCase).to(delete_user_usercase_1.DeleteUser);
