import { HttpService } from '@nestjs/axios';
import { SetDataLineNotify } from './interface/line-notify.interface';
export declare class LineNotifyService {
    private httpService;
    private readonly endPoint;
    private logger;
    constructor(httpService: HttpService);
    setData(data: SetDataLineNotify): Promise<void>;
    private callLineNotify;
}
