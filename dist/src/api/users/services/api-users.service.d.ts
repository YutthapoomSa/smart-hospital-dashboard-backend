import { OnApplicationBootstrap } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Sequelize } from 'sequelize-typescript';
import { UserTokenDB } from '../../../database/entity/user-token.entity';
import { UserDB } from '../../../database/entity/user.entity';
import { ConvertImageService } from '../../../helper/services/convert-image.service';
import { EncryptionService } from '../../../helper/services/encryption.service';
import { PaginationService } from '../../../helper/services/pagination/pagination.service';
import { ConfigService } from '../../../shared/config/config.service';
import { CreateUserReqDTO } from '../dto/create-user-req.dto';
import { UserLoginRefreshToKenReqDto } from '../dto/user-login-refreshToken.dto';
import { UserLoginRequestDTO } from '../dto/user-login.dto';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { FindOneUserResDTO } from './../dto/find-one-user-res.dto';
import { UsersService } from './users.service';
export declare class ApiUsersService implements OnApplicationBootstrap {
    private cacheManager;
    private usersRepository;
    private userTokenRepository;
    private userRepository;
    private sequelize;
    private configService;
    private paginationService;
    private encryptionService;
    private convertImageService;
    private usersService;
    private logger;
    constructor(cacheManager: Cache, usersRepository: typeof UserDB, userTokenRepository: typeof UserTokenDB, userRepository: typeof UserDB, sequelize: Sequelize, configService: ConfigService, paginationService: PaginationService, encryptionService: EncryptionService, convertImageService: ConvertImageService, usersService: UsersService);
    onApplicationBootstrap(): Promise<void>;
    api_findOne(id: number): Promise<FindOneUserResDTO>;
    api_login(userLoginRequestDto: UserLoginRequestDTO): Promise<{
        resCode: ResStatus;
        resData: {};
        msg: string;
    }>;
    api_createWithAdmin(body: CreateUserReqDTO, user: UserDB): Promise<FindOneUserResDTO>;
    api_create(body: CreateUserReqDTO): Promise<FindOneUserResDTO>;
    api_refreshToken(user: UserDB, createUserDto: UserLoginRefreshToKenReqDto): Promise<{
        resCode: ResStatus;
        resData: {};
        msg: string;
    }>;
}
