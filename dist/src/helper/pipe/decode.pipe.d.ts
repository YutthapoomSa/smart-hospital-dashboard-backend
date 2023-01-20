import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ConfigService } from './../../shared/config/config.service';
import { EncryptionService } from './../services/encryption.service';
export declare class DecodePipe implements PipeTransform {
    private configService;
    private encryptionService;
    constructor(configService: ConfigService, encryptionService: EncryptionService);
    private logger;
    transform(value: BodyEncode, metadata: ArgumentMetadata): any;
}
interface BodyEncode {
    data: string;
}
export {};
