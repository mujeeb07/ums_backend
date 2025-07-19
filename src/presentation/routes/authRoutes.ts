import express from 'express';
import { logutUser, registerUser } from '../controllers/authController'; 
import { loginUser } from '../controllers/authController';
import { userProfile } from '../controllers/userController';
import { protect, userOnly } from '../middleware/authMiddleware';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logutUser)
// router.get("/profile",protect, userOnly, userProfile)
 
export default router;
