import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ConfigService } from './../../shared/config/config.service';
import { EncryptionService } from './../services/encryption.service';
export declare class ParseDecodePipe implements PipeTransform<string> {
    private configService;
    private encryptionService;
    private logger;
    constructor(configService: ConfigService, encryptionService: EncryptionService);
    transform(value: any, metadata: ArgumentMetadata): string;
}
