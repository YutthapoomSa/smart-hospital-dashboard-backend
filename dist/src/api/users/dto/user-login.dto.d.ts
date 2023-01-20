import { ResStatus } from './../../../shared/enum/res-status.enum';
export declare class UserLoginRequestDTO {
    readonly username: string;
    readonly password: string;
}
declare class LoginResDTOResData {
    username: string;
    password: string;
}
export declare class LoginResDTO {
    resCode: ResStatus;
    resData: LoginResDTOResData;
    msg: string;
    constructor(resCode: ResStatus, msg: string, _username: string, _password: string);
}
export {};
