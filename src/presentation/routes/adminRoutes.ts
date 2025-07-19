import express from 'express';
import { 
    getAllUsers,
    createUserByAdmin, 
    updateUserByAdmin, 
    deleteUserByAdmin,
    toggleUserStatus
} from '../controllers/adminController';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { userProfile } from '../controllers/userController';

const router = express.Router();

function asyncHandler(fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any> | void) {
    return function (req: express.Request, res: express.Response, next: express.NextFunction): void {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

router.get("/profile",protect, adminOnly, userProfile)
router.get('/users', protect, adminOnly, asyncHandler(getAllUsers));
router.post('/users/create', protect, adminOnly, asyncHandler(createUserByAdmin));
router.put('/users/:userId', protect, adminOnly, asyncHandler(updateUserByAdmin));
router.patch('/users/status/:userId', protect, adminOnly, asyncHandler(toggleUserStatus));
router.delete('/users/:userId', protect, adminOnly, asyncHandler(deleteUserByAdmin));

export default router;