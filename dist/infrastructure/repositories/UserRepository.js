"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const inversify_1 = require("inversify");
const UserModel_1 = require("../database/models/UserModel");
const mongoose_1 = require("mongoose");
let UserRepository = class UserRepository {
    async getAllUsers(searchQuery, limit, pageNumber) {
        const filter = {
            role: { $ne: "admin" },
        };
        if (!searchQuery === undefined) {
            filter.$or = [
                { username: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } },
            ];
        }
        const skip = (pageNumber - 1) * limit;
        const [users, total] = await Promise.all([
            UserModel_1.UserModel.find(filter).skip(skip).limit(limit),
            UserModel_1.UserModel.countDocuments(filter)
        ]);
        // console.log("Users data from the repository:", users)
        return { users, total };
    }
    async findByEmail(email) {
        return await UserModel_1.UserModel.findOne({ email });
    }
    async createUser(user) {
        const newUser = new UserModel_1.UserModel(user);
        return await newUser.save();
    }
    async updateUser(userId, updatedData) {
        return await UserModel_1.UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
    }
    async deleteUser(userId) {
        console.log("User id at the delete user repository:", userId);
        return await UserModel_1.UserModel.findByIdAndDelete(userId);
    }
    async udpateUserStatus(userId) {
        const user = await UserModel_1.UserModel.findById(new mongoose_1.Types.ObjectId(userId));
        // console.log("user data at repo:", user)
        if (!user)
            return null;
        user.status = !user.status;
        await user.save();
        return user.toObject();
    }
    async findById(userId) {
        const user = await UserModel_1.UserModel.findById(new mongoose_1.Types.ObjectId(userId));
        return user;
    }
    async userProfile(userId) {
        const user = await UserModel_1.UserModel.findById(userId);
        return user;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, inversify_1.injectable)()
], UserRepository);
