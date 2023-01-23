import {
    CACHE_MANAGER,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    OnApplicationBootstrap,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Sequelize } from 'sequelize-typescript';
import { DataBase } from './../../../database/database.providers';
import { UserTokenDB } from '../../../database/entity/user-token.entity';
import { UserDB, UserDBRole } from '../../../database/entity/user.entity';
import { ConvertImageService } from '../../../helper/services/convert-image.service';
import { EncryptionService } from '../../../helper/services/encryption.service';
import { LogService } from '../../../helper/services/log.service';
import { PaginationService } from '../../../helper/services/pagination/pagination.service';
import { ConfigService } from '../../../shared/config/config.service';
import { CreateUserReqDTO } from '../dto/create-user-req.dto';
import { UserLoginRefreshToKenReqDto } from '../dto/user-login-refreshToken.dto';
import { UserLoginRequestDTO } from '../dto/user-login.dto';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { FindOneUserResDTO } from './../dto/find-one-user-res.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class ApiUsersService implements OnApplicationBootstrap {
    private logger = new LogService(ApiUsersService.name);

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @Inject(DataBase.UserDB) private usersRepository: typeof UserDB,
        @Inject(DataBase.UserTokenDB) private userTokenRepository: typeof UserTokenDB,
        @Inject(DataBase.UserDB) private userRepository: typeof UserDB,
        @Inject('SEQUELIZE') private sequelize: Sequelize,

        private configService: ConfigService,
        private paginationService: PaginationService,
        private encryptionService: EncryptionService,
        private convertImageService: ConvertImageService,

        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService
    ) { }

    async onApplicationBootstrap() {
        //
    }

    async api_findOne(id: number): Promise<FindOneUserResDTO> {
        const tag = this.api_findOne.name;
        try {
            return new FindOneUserResDTO(ResStatus.success, '', await this.usersService.findOne(id));
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_login(userLoginRequestDto: UserLoginRequestDTO) {
        const tag = this.api_login.name;
        try {
            return await this.usersService.login(userLoginRequestDto);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_createWithAdmin(body: CreateUserReqDTO, user: UserDB) {
        const tag = this.api_create.name;
        try {
            if (String(user.role) !== String(UserDBRole.admin)) throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
            if (!body) throw new Error('data is required')
            const email = await this.usersService.isEmail(body.email);

            if (email) {
                return new FindOneUserResDTO(ResStatus.fail, 'อีเมลนี้ถูกใช้ไปแล้ว', null);
            }

            // ─────────────────────────────────────────────────────────────────
            const resultHash = await this.usersService.genPassword(body.password);
            const _salt = resultHash.salt;
            const _hashPass = resultHash.hashPass;

            const users = new UserDB();
            users.email = body.email.trim().toLowerCase();
            users.username = body.username.trim().toLowerCase();
            users.firstName = body.firstName;
            users.lastName = body.lastName;
            users.password = _hashPass;
            users.gender = body.gender;
            users.phoneNumber = body.phoneNumber;

            await users.save();
            // console.log(users);
            return new FindOneUserResDTO(ResStatus.success, '', users);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_create(body: CreateUserReqDTO) {
        const tag = this.api_create.name;
        try {
            // console.log(JSON.stringify(user, null, 2));
            if (!body) throw new Error('data is required')
            const email = await this.usersService.isEmail(body.email);

            if (email) {
                return new FindOneUserResDTO(ResStatus.fail, 'อีเมลนี้ถูกใช้ไปแล้ว', null);
            }

            // ─────────────────────────────────────────────────────────────────
            const resultHash = await this.usersService.genPassword(body.password);
            const _salt = resultHash.salt;
            const _hashPass = resultHash.hashPass;

            const users = new UserDB();
            users.email = body.email.trim().toLowerCase();
            users.username = body.username.trim().toLowerCase();
            users.firstName = body.firstName;
            users.lastName = body.lastName;
            users.password = _hashPass;
            users.gender = body.gender;
            users.phoneNumber = body.phoneNumber;

            await users.save();
            return new FindOneUserResDTO(ResStatus.success, '', users);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_refreshToken(user: UserDB, createUserDto: UserLoginRefreshToKenReqDto) {
        const tag = this.api_refreshToken.name;
        try {
            return await this.usersService.refreshToken(user, createUserDto);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_updateUserById(user: UserDB, body: UpdateUserDto) {
        const tag = this.api_updateUserById.name;
        try {
            const updateUser = await this.usersService.api_updateUserById(user, body);
            return updateUser;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
