import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreatedAt,
    DataType, HasMany,
    IsEmail,
    Model,
    Table,
    UpdatedAt
} from 'sequelize-typescript';
import { UserPasswordDB } from './user-password.entity';
import { UserSocketDB } from './user-socket.entity';

export enum UserDBRole {
    // superAdmin = 'superAdmin',
    admin = 'admin',
    user = 'user',
}

export enum UserDBGender {
    male = 'male',
    female = 'female',
    other = 'other',
}

@Table({
    tableName: 'user',
    comment:'ตารางข้อมูล user'
})
export class UserDB extends Model<UserDB> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'unique_user_id',
        primaryKey: true,
    })
    id: number;

    @Column({
        allowNull: false,
    })
    email: string;

    @Column({
        allowNull: false,
    })
    username: string;

    @Column({
        allowNull: false,
    })
    password: string;

    @Column({
        allowNull: false,
    })
    firstName: string;

    @Column({
        allowNull: false,
    })
    lastName: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM(UserDBRole.admin, UserDBRole.user),
        comment: 'สิทธิ์การเข้าใช้งาน',
        defaultValue: UserDBRole.user,
    })
    role: UserDBRole;

    @Column({
        comment: 'status เปิด ปิด',
        defaultValue: true,
        allowNull: false,
    })
    status: boolean;

    @Column({
        allowNull: true,
    })
    image: string;

    @Column({
        allowNull: true,
        type: DataType.ENUM(UserDBGender.male, UserDBGender.female, UserDBGender.other),
        comment: 'เพศ',
    })
    gender: UserDBGender;

    @Column({
        type: DataType.TEXT(),
        defaultValue: null,
        allowNull: true,
    })
    phoneNumber: string;

    @CreatedAt
    readonly createdAt?: Date;

    @UpdatedAt
    readonly updatedAt?: Date;

    // ─────────────────────────────────────────────────────────────────

    @HasMany(() => UserSocketDB)
    userSocketLists: UserSocketDB[];

    @HasMany(() => UserPasswordDB)
    userPasswordLists: UserPasswordDB[];
    accessToken: string;
    refreshToken: string;

    // ─────────────────────────────────────────────────────────────────

    // @ForeignKey(() => AgencyDB)
    // @Column({
    //     type: DataType.INTEGER,
    //     allowNull: true,
    //     field: 'agency_id'
    // })
    // agencyId: number;

    // @BelongsTo(() => AgencyDB)
    // agency: AgencyDB;
}
