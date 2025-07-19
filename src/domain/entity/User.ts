export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    image?: string;
    role: "user" | "admin",
    status: boolean
}