"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleUserStatus = exports.updateUserByAdmin = exports.deleteUserByAdmin = exports.createUserByAdmin = exports.getAllUsers = void 0;
const inversify_config_1 = require("../../container/inversify.config");
const types_1 = require("../../container/types");
const getAllUsers = async (req, res) => {
    try {
        const { searchQuery, page, limit } = req.query;
        const getAllUsersUseCase = inversify_config_1.container.get(types_1.TYPES.GetAllUsersUseCase);
        const users = await getAllUsersUseCase.execute(String(searchQuery), Number(page), Number(limit));
        // console.log("get all users:", users)
        res.status(200).json(users);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};
exports.getAllUsers = getAllUsers;
const createUserByAdmin = async (req, res) => {
    try {
        const { username, email, password, image, role, status } = req.body;
        console.log("user details from the body:", username, email, password, image, role, status);
        const registerUser = inversify_config_1.container.get(types_1.TYPES.RegisterUser);
        await registerUser.execute(username, email, password, image, role, status);
        res.status(200).json({ message: "user created successfully", registerUser });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createUserByAdmin = createUserByAdmin;
const deleteUserByAdmin = async (req, res) => {
    const { userId } = req.params;
    try {
        const deleteUser = inversify_config_1.container.get(types_1.TYPES.DeleteUserUseCase);
        const user = await deleteUser.execute(userId);
        res.status(200).json({ message: "User deleted successfully.", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteUserByAdmin = deleteUserByAdmin;
const updateUserByAdmin = async (req, res) => {
    // console.log("update user by admin controller hit...")
    try {
        const { userId } = req.params;
        const { username, email, image, status } = req.body;
        const updateUserUseCase = inversify_config_1.container.get(types_1.TYPES.UpdateUserUseCases);
        const updatedUserData = await updateUserUseCase.execute(userId, username, email, image, status);
        res.status(200).json(updatedUserData);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateUserByAdmin = updateUserByAdmin;
const toggleUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const toggleUserStatusUseCase = inversify_config_1.container.get(types_1.TYPES.ToggleUserStatusUseCase);
        const updatedUser = await toggleUserStatusUseCase.execute(userId);
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
};
exports.toggleUserStatus = toggleUserStatus;
