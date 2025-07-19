"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logutUser = exports.loginUser = exports.registerUser = void 0;
const inversify_config_1 = require("../../container/inversify.config");
const types_1 = require("../../container/types");
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const registerUser = async (req, res) => {
    try {
        const { username, email, password, image, status } = req.body;
        const role = "user";
        const registerUseCase = inversify_config_1.container.get(types_1.TYPES.RegisterUser);
        const user = await registerUseCase.execute(username, email, password, image, role, status);
        const token = (0, generateToken_1.default)(String(user._id), user.role);
        res.status(201).json({
            message: "user rergistered successfully",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                image: user.image,
                token: token
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message || "something wrong while user register" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    // console.log("request at the auth controller11111...")
    try {
        const { email, password } = req.body;
        // console.log("Login details :",email, password)
        const loginUseCase = inversify_config_1.container.get(types_1.TYPES.LoginUserCase);
        const user = await loginUseCase.execute(email, password);
        const token = (0, generateToken_1.default)(String(user._id), user.role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            image: user.image,
            token: token
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error || "something wrong while user login" });
    }
};
exports.loginUser = loginUser;
const logutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "user loged out successfully" });
    }
};
exports.logutUser = logutUser;
