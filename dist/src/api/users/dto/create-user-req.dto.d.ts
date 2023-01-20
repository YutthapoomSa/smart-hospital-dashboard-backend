import { UserDBGender, UserDBRole } from '../../../database/entity/user.entity';
export declare class CreateUserReqDTO {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: UserDBGender;
    phoneNumber: string;
    role: UserDBRole;
}
