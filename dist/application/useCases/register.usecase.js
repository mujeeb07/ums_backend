"use strict";
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
exports.RegisterUser = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../container/types");
const matchPassword_1 = require("../../utils/matchPassword");
let RegisterUser = class RegisterUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(username, email, password, image, role, status) {
        const exsistingUser = await this.userRepo.findByEmail(email);
        if (exsistingUser) {
            throw new Error("User already exist with this email");
        }
        const userData = { username, email, password, image, role, status };
        const hashedPassword = await (0, matchPassword_1.hashPassword)(password);
        const createdUser = await this.userRepo.createUser({ ...userData, password: hashedPassword });
        return {
            _id: String(createdUser._id),
            username: createdUser.username,
            email: createdUser.email,
            password: hashedPassword,
            image: createdUser.image,
            role: createdUser.role,
            status: createdUser.status
        };
    }
};
exports.RegisterUser = RegisterUser;
exports.RegisterUser = RegisterUser = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], RegisterUser);
