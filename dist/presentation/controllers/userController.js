"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfile = exports.updateUser = void 0;
const inversify_config_1 = require("../../container/inversify.config");
const types_1 = require("../../container/types");
const updateUser = async (req, res) => {
    // console.log(req.params.id)
    try {
        const { username, email, image, status } = req.body;
        const { id: userId } = req.user;
        const updateUserCase = inversify_config_1.container.get(types_1.TYPES.UpdateUserUseCases);
        const userData = await updateUserCase.execute(userId, username, email, image, status);
        res.status(200).json({ userData });
        return;
    }
    catch (error) {
        console.log("Update user error:", error);
        res.status(500).json({ message: "internal server error" });
        return;
    }
};
exports.updateUser = updateUser;
const userProfile = async (req, res) => {
    const { id } = req.user;
    // console.log("api calling",id)
    try {
        const userProfile = inversify_config_1.container.get(types_1.TYPES.UserProfileUseCase);
        const userData = await userProfile.execute(id);
        // console.log(userData)
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to fetch user profile." });
        return;
    }
};
exports.userProfile = userProfile;
