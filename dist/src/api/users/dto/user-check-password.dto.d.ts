export declare class UserResetPasswordReqDTO {
    readonly hashPassword: string;
}
export declare class UserResetPasswordResDTO {
    readonly isResetProgress: boolean;
    constructor(isResetProgress: boolean);
}
