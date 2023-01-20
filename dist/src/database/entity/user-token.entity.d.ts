import { Model } from 'sequelize-typescript';
import { UserDB } from './user.entity';
export declare class UserTokenDB extends Model<UserTokenDB> {
    id: number;
    accessToken: string;
    refreshToken: string;
    expire: string;
    userId: number;
    user: UserDB;
}
