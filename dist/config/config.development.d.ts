import { Dialect } from 'sequelize/types';
export declare const config: {
    database: {
        dialect: Dialect;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
    };
    jwtPrivateKey: string;
    loginConfig: {
        encryption: boolean;
        loginPrivateKey: string;
    };
    pool: {
        max: number;
        min: number;
        idle: number;
        evict: number;
        acquire: number;
    };
    benchmark: boolean;
    omiseConfig: {
        secretKey: string;
    };
    imagePath: {
        uploadEndpoint: string;
    };
};
