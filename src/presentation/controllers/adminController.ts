import { Request, Response } from "express";
import { container } from "../../container/inversify.config";
import { TYPES } from "../../container/types";
import {
    DeleteUserUseCase,
    GetAllUsersUseCase,
    RegisterUserUseCase,
    ToggleUserStatusUseCase,
    UpdateUserUseCase
} from "../../domain/usecases/IUserUseCases";


export const getAllUsers = async (req: Request, res: Response):Promise<void> => {
    try {
        const { searchQuery, page, limit } = req.query;
        
        const getAllUsersUseCase = container.get<GetAllUsersUseCase>(TYPES.GetAllUsersUseCase);
        const users = await getAllUsersUseCase.execute(String(searchQuery), Number(page), Number(limit));
        // console.log("get all users:", users)
        res.status(200).json(users)
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
        return
    }
} 

export const createUserByAdmin = async (req: Request, res: Response) => {
    try {
        const { username, email, password, image, role, status } = req.body
        console.log("user details from the body:", username, email, password, image, role, status);
        
        const registerUser = container.get<RegisterUserUseCase>(TYPES.RegisterUser);
        await registerUser.execute(username, email, password, image, role, status);
        res.status(200).json({ message: "user created successfully", registerUser })
    } catch (error) {
        console.log("Create user by admin error:", error)
        res.status(500).json({ message: error });
    }
}

export const deleteUserByAdmin = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try{
        const deleteUser = container.get<DeleteUserUseCase>(TYPES.DeleteUserUseCase);

        const user = await deleteUser.execute(userId);
        res.status(200).json({ message:"User deleted successfully." , user})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error"})
    }
}

export const updateUserByAdmin = async (req: Request, res: Response) => {
    // console.log("update user by admin controller hit...")
 try {
    const { userId } = req.params;
    const { username, email, image, status } = req.body;
     
    const updateUserUseCase = container.get<UpdateUserUseCase>(TYPES.UpdateUserUseCases);
    const updatedUserData = await updateUserUseCase.execute(userId, username, email, image, status)

    res.status(200).json(updatedUserData);
 } catch (error) {
     res.status(500).json({ message: error });
 }
}


export const toggleUserStatus = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const toggleUserStatusUseCase = container.get<ToggleUserStatusUseCase>(TYPES.ToggleUserStatusUseCase);

        const updatedUser = await toggleUserStatusUseCase.execute(userId);

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error");
    }
}