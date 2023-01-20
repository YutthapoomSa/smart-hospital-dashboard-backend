import { UserDB, UserDBGender, UserDBRole } from '../../../database/entity/user.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
declare class FindOneUserResDTOResData {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    role: UserDBRole;
    status: boolean;
    gender: UserDBGender;
    phoneNumber: string;
}
export declare class FindOneUserResDTO {
    resCode: ResStatus;
    resData: FindOneUserResDTOResData;
    msg: string;
    constructor(resCode: ResStatus, msg: string, datas: UserDB);
}
export {};
