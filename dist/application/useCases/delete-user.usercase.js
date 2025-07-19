"use strict";
// import { inject, injectable } from "inversify";
// import { TYPES } from "../../container/types";
// import { IUserRepository } from "../../domain/interfaces/IUserRespository";
// import { DeleteUserUseCase } from "../../domain/usecases/IUserUseCases";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = void 0;
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
const inversify_1 = require("inversify");
const types_1 = require("../../container/types");
let DeleteUser = class DeleteUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(userId) {
        console.log("Delete user execution....");
        console.log("userId type:", typeof userId);
        console.log("userId value:", userId);
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid user ID provided");
        }
        if (!userId)
            throw new Error("User id not found");
        const user = await this.userRepo.deleteUser(userId);
        if (!user)
            throw new Error("User not found");
        console.log("Deleted User:", user);
        return user;
    }
};
exports.DeleteUser = DeleteUser;
exports.DeleteUser = DeleteUser = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], DeleteUser);
