"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function matchPasswords(enteredPassword, userPassword) {
    try {
        const isMatch = await bcryptjs_1.default.compare(enteredPassword, userPassword);
        return isMatch;
    }
    catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
async function hashPassword(plainPassword) {
    try {
        const saltRounds = 10;
        const salt = await bcryptjs_1.default.genSalt(saltRounds);
        const hashedPassword = await bcryptjs_1.default.hash(plainPassword, salt);
        return hashedPassword;
    }
    catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
exports.default = matchPasswords;
