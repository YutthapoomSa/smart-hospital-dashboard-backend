import { ConfigService } from './../../shared/config/config.service';
export declare class EncryptionService {
    private configService;
    constructor(configService: ConfigService);
    decode(textEncryption: string): string;
    encode(textEncryption: string): string;
}
