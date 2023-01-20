import { Model } from 'sequelize-typescript';
import { UserDB } from './user.entity';
export declare class UserSocketDB extends Model<UserSocketDB> {
    id: number;
    refreshToken: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    userId: number;
    user: UserDB;
}
