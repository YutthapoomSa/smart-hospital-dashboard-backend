declare const _default: {
    database: {
        dialect: import("sequelize").Dialect;
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
} | {
    database: {
        dialect: import("sequelize").Dialect;
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
export default _default;
