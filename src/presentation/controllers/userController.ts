import { Request, Response } from "express";
import { container } from "../../container/inversify.config";
import { UpdateUserUseCase, UserProfileUseCase } from "../../domain/usecases/IUserUseCases";
import { TYPES } from "../../container/types";
import { Payload } from "../middleware/authMiddleware";
import { IUser } from "../../domain/entity/User";

export const updateUser = async (req: Request, res: Response):Promise<void> => {
    // console.log(req.params.id)
    try {
        const { username, email, image, status } = req.body;
        const { id:userId }  = req.user as Payload

        const updateUserCase = container.get<UpdateUserUseCase>(TYPES.UpdateUserUseCases);
        const userData = await updateUserCase.execute(userId,username, email, image, status )
       res.status(200).json({userData});
       return 
    } catch (error: any) {
        console.log("Update user error:", error);
         res.status(500).json({ message: "internal server error" });
         return
    }
};

export const userProfile = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user as Payload
    // console.log("api calling",id)
    
    try {
        const userProfile = container.get<UserProfileUseCase>(TYPES.UserProfileUseCase);
        const userData = await userProfile.execute(id);
        // console.log(userData)
        res.status(200).json(userData);
    } catch (error: any) {
        res.status(500).json({ message: "Unable to fetch user profile." });
        return;
    }
}