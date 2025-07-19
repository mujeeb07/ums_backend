import express from 'express';
import { updateUser, userProfile }  from '../controllers/userController';
import { protect, userOnly } from '../middleware/authMiddleware';


const router = express.Router();


router.put("/:id", protect, updateUser);
router.get("/profile",protect, userOnly, userProfile)

export default router