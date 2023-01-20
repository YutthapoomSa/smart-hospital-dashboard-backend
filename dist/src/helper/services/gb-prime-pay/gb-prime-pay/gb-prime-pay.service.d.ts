import { HttpService } from '@nestjs/common';
import { ResGBPayQuery } from '../../interface/gb-query-res.interface';
import { ConfigService } from './../../../../shared/config/config.service';
export declare class GbPrimePayService {
    private httpService;
    private configService;
    private readonly endPoint;
    private readonly TOKEN;
    private logger;
    constructor(httpService: HttpService, configService: ConfigService);
    createTransaction(referenceNo: string, amount: string): Promise<ResGetQrTransaction>;
    private call_createTransaction;
}
interface ResGetQr {
    fileName: string;
    destination: string;
    path: string;
}
export interface ResGetQrTransaction {
    qrInfo: ResGetQr;
    transactionInfo: ResGBPayQuery;
}
export {};
