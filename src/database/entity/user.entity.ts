import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserPasswordDB } from './user-password.entity';
import { UserSocketDB } from './user-socket.entity';

export enum UserDBRole {
    admin = 'admin',
    user = 'user',
}

export enum UserDBGender {
    male = 'male',
    female = 'female',
    other = 'other',
}

// export enum UserPositions {
//     director = 'ผู้อำนวยการ',
// }

@Table({
    tableName: 'user',
    comment: 'ตารางข้อมูล user',
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

    // @Column({
    //     allowNull: false,
    //     type: DataType.ENUM(UserPositions.director),
    //     comment: 'ตำแหน่งงาน',
    // })
    // position: UserPositions;

    @Column({
        allowNull: false,
        type: DataType.ENUM(UserDBRole.admin, UserDBRole.user),
        comment: 'สิทธิ์การเข้าใช้งาน',
        // defaultValue: UserDBRole.user,
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

    @Column({
        defaultValue: false,
        allowNull: false,
    })
    isDelete: boolean;

    // @Column({
    //     type: DataType.DATE(),
    //     defaultValue: () => Date.now(),
    //     allowNull: false,
    // })
    // @CreatedAt
    // readonly createdAt?: Date;

    // @Column({
    //     type: DataType.DATE(),
    //     defaultValue: () => Date.now(),
    //     allowNull: false,
    // })
    // @UpdatedAt
    // readonly updatedAt?: Date;

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
