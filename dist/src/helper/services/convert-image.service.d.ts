/// <reference types="multer" />
import { OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '../../shared/config/config.service';
export declare class ConvertImageService implements OnApplicationBootstrap {
    private configService;
    constructor(configService: ConfigService);
    onApplicationBootstrap(): void;
    private logger;
    fileToWebP(fileName: Express.Multer.File | any): Promise<OutputConvert>;
    base64ToWebp(dataBase64: string, type: string): Promise<OutputConvert>;
    getLinkImage(img: string): string;
    isQrDir(): void;
}
export interface OutputConvert {
    fileName: string;
    destination: string;
    path: string;
}
