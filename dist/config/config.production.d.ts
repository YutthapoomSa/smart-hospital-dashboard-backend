import { Dialect } from 'sequelize/types';
export declare const config: {
    database: {
        dialect: Dialect;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        logging: boolean;
    };
    jwtPrivateKey: string;
    loginConfig: {
        encryption: boolean;
        loginPrivateKey: string;
    };
    omiseConfig: {
        secretKey: string;
    };
    imagePath: {
        uploadEndpoint: string;
    };
};
