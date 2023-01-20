import { OnApplicationBootstrap } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Sequelize } from 'sequelize-typescript';
import { UserTokenDB } from '../../../database/entity/user-token.entity';
import { UserDB } from '../../../database/entity/user.entity';
import { ConvertImageService } from '../../../helper/services/convert-image.service';
import { EncryptionService } from '../../../helper/services/encryption.service';
import { ConfigService } from '../../../shared/config/config.service';
import { UserNameCheckResDTO } from '../dto/user-check.dto';
import { UserLoginRefreshToKenReqDto } from '../dto/user-login-refreshToken.dto';
import { UserLoginRequestDTO } from '../dto/user-login.dto';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { CacheUsersService } from './cache-users.service';
export declare class UsersService implements OnApplicationBootstrap {
    private cacheManager;
    private readonly usersRepository;
    private readonly userTokenRepository;
    private readonly userRepository;
    private readonly sequelize;
    private readonly configService;
    private encryptionService;
    private convertImageService;
    private cacheUsersService;
    private readonly jwtPrivateKey;
    private logger;
    constructor(cacheManager: Cache, usersRepository: typeof UserDB, userTokenRepository: typeof UserTokenDB, userRepository: typeof UserDB, sequelize: Sequelize, configService: ConfigService, encryptionService: EncryptionService, convertImageService: ConvertImageService, cacheUsersService: CacheUsersService);
    onApplicationBootstrap(): void;
    update(id: number): Promise<void>;
    findOne(id: number): Promise<UserDB>;
    isEmail(_email: string): Promise<boolean>;
    genPassword(password: string): Promise<{
        salt: string;
        hashPass: string;
    }>;
    login(body: UserLoginRequestDTO): Promise<{
        resCode: ResStatus;
        resData: {};
        msg: string;
    }>;
    refreshToken(user: UserDB, body: UserLoginRefreshToKenReqDto): Promise<{
        resCode: ResStatus;
        resData: {};
        msg: string;
    }>;
    verifyAccessToken(jit: string): Promise<boolean>;
    verifyRefreshToken(jit: string): Promise<boolean>;
    checkUserName(_username: string): Promise<UserNameCheckResDTO>;
    private initSuperAdmin;
    signToken(user: UserDB, expires?: string): Promise<{
        token: string;
        jit: string;
    }>;
    getAllUserId(): Promise<number[]>;
    cronLoginToken(): void;
}
