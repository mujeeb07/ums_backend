import { Request, Response } from "express";
import { container } from "../../container/inversify.config";
import { TYPES } from "../../container/types";
import { LoginUserUseCase ,RegisterUserUseCase} from "../../domain/usecases/IUserUseCases";
import generateToken from "../../utils/generateToken";


export const registerUser = async (req: Request, res: Response) => {

    try {
        const { username, email, password, image, status } = req.body;

        const role = "user"
        const registerUseCase = container.get<RegisterUserUseCase>(TYPES.RegisterUser);

        const user = await registerUseCase.execute( username, email, password, image, role, status );
        const token = generateToken(String(user._id), user.role);

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
    } catch (error: any) {
        res.status(400).json({ message: error.message || "something wrong while user register"});
    }
}

export const loginUser = async (req: Request, res: Response) => {
    console.log("request at the auth controller11111...")
    try {
        const { email, password } = req.body;
        console.log("Login details :",email, password) 
        const loginUseCase = container.get<LoginUserUseCase>(TYPES.LoginUserCase);

        const user = await loginUseCase.execute(email, password);
        const token = generateToken(String(user._id), user.role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            image: user.image,
            token:token
        });
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error || "something wrong while user login" });
    }
}


export const logutUser = async (req: Request, res: Response) => {
    
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
          });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({mesage: "user loged out successfully"})
        
    }
}