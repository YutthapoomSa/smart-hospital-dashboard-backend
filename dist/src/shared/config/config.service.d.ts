export declare class ConfigService {
    get sequelizeOrmConfig(): {
        dialect: import("sequelize").Dialect;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
    } | {
        dialect: import("sequelize").Dialect;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        logging: boolean;
    };
    get jwtConfig(): {
        privateKey: string;
    };
    get loginConfig(): {
        privateKey: {
            encryption: boolean;
            loginPrivateKey: string;
        } | {
            encryption: boolean;
            loginPrivateKey: string;
        };
    };
    get omiseConfig(): {
        secretKey: string;
    };
    get genPointUpload(): {
        endpoint: string;
    };
    get getImagePath(): {
        endPoint: string;
    };
}
