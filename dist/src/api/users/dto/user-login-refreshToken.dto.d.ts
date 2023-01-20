import { ResStatus } from 'src/shared/enum/res-status.enum';
export declare class UserLoginRefreshToKenReqDto {
    accessToken: string;
    refreshToken: string;
}
declare class UserLoginRefreshToKenResData {
    accessToken: string;
    refreshToken: string;
    expire: string;
}
export declare class LoginResDTO {
    resCode: ResStatus;
    resData: UserLoginRefreshToKenResData;
    msg: string;
    constructor(resCode: ResStatus, msg: string, _accessToken: string, _refreshToken: string, _expire: Date);
}
export {};
