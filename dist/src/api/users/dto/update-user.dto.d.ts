import { UserDBGender, UserDBRole } from './../../../database/entity/user.entity';
export declare class UpdateUserDto {
    readonly id: number;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly role: UserDBRole;
    status: boolean;
    image: string;
    point: number;
    pointTotal: number;
    address: string;
    gender: UserDBGender;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}
