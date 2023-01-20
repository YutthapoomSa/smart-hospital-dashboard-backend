import { Model } from 'sequelize-typescript';
import { UserPasswordDB } from './user-password.entity';
import { UserSocketDB } from './user-socket.entity';
export declare enum UserDBRole {
    admin = "admin",
    user = "user"
}
export declare enum UserDBGender {
    male = "male",
    female = "female",
    other = "other"
}
export declare class UserDB extends Model<UserDB> {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserDBRole;
    status: boolean;
    image: string;
    gender: UserDBGender;
    phoneNumber: string;
    userSocketLists: UserSocketDB[];
    userPasswordLists: UserPasswordDB[];
    accessToken: string;
    refreshToken: string;
}
