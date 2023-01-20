import { Model } from 'sequelize-typescript';
import { UserDB } from './user.entity';
export declare class UserPasswordDB extends Model<UserPasswordDB> {
    id: number;
    hashPassword: string;
    isResetProgress: boolean;
    resetCode: string;
    resetExpires: Date;
    activate: boolean;
    userId: number;
    user: UserDB;
}
