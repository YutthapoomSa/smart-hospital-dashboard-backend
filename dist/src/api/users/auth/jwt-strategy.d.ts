import { Strategy, VerifiedCallback } from 'passport-jwt';
import { UsersService } from '../services/users.service';
import { EncryptionService } from './../../../helper/services/encryption.service';
import { ConfigService } from './../../../shared/config/config.service';
import { JwtPayload } from './jwt-payload.model';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    private configService;
    private encryptionService;
    private logger;
    constructor(usersService: UsersService, configService: ConfigService, encryptionService: EncryptionService);
    validate(payload: JwtPayload, done: VerifiedCallback): Promise<void>;
}
export {};
