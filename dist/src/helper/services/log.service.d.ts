export declare class LogService {
    private tags;
    private tag;
    private logger;
    constructor(tags: string);
    private getDate;
    info(...args: any): void;
    debug(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
    private toString;
}
