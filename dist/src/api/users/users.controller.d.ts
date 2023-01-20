import { FindOneUserResDTO } from './dto/find-one-user-res.dto';
import { UserDB } from './../../database/entity/user.entity';
import { CreateUserReqDTO } from './dto/create-user-req.dto';
import { ApiUsersService } from './services/api-users.service';
import { UserLoginRequestDTO } from './dto/user-login.dto';
import { UserLoginRefreshToKenReqDto } from './dto/user-login-refreshToken.dto';
export declare class UsersController {
    private readonly apiUsersService;
    constructor(apiUsersService: ApiUsersService);
    register(body: CreateUserReqDTO): Promise<FindOneUserResDTO>;
    registerWithAdmin(body: CreateUserReqDTO, user: UserDB): Promise<FindOneUserResDTO>;
    login(body: UserLoginRequestDTO): Promise<{
        resCode: import("../../shared/enum/res-status.enum").ResStatus;
        resData: {};
        msg: string;
    }>;
    find(id: number): Promise<FindOneUserResDTO>;
    refreshToken(user: UserDB, body: UserLoginRefreshToKenReqDto): Promise<{
        resCode: import("../../shared/enum/res-status.enum").ResStatus;
        resData: {};
        msg: string;
    }>;
}
