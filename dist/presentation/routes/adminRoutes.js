"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
router.get("/profile", authMiddleware_1.protect, authMiddleware_1.adminOnly, userController_1.userProfile);
router.get('/users', authMiddleware_1.protect, authMiddleware_1.adminOnly, asyncHandler(adminController_1.getAllUsers));
router.post('/users/create', authMiddleware_1.protect, authMiddleware_1.adminOnly, asyncHandler(adminController_1.createUserByAdmin));
router.put('/users/:userId', authMiddleware_1.protect, authMiddleware_1.adminOnly, asyncHandler(adminController_1.updateUserByAdmin));
router.patch('/users/status/:userId', authMiddleware_1.protect, authMiddleware_1.adminOnly, asyncHandler(adminController_1.toggleUserStatus));
router.delete('/users/:userId', authMiddleware_1.protect, authMiddleware_1.adminOnly, asyncHandler(adminController_1.deleteUserByAdmin));
exports.default = router;
