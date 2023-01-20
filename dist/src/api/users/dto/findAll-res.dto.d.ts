import { UserDB, UserDBGender, UserDBRole } from './../../../database/entity/user.entity';
import { ResDataCommon } from './../../../helper/services/pagination/res-data-common.interface';
declare class FindAllResDTOResData {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    role: UserDBRole;
    status: boolean;
    gender: UserDBGender;
    phoneNumber: string;
}
export declare class Option {
    search: string;
}
export declare class FindAllResDTO {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    option: Option;
    datas: FindAllResDTOResData[];
    constructor(resData: ResDataCommon, datas: UserDB);
}
export {};
