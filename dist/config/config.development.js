"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('ORM');
exports.config = {
    database: {
        dialect: 'mysql',
        host: 'internal.neercode.com',
        port: 3306,
        username: 'root',
        password: '123132123',
        database: 'dashboard',
        timezone: '+07:00',
    },
    jwtPrivateKey: 'jwtPrivateKey',
    loginConfig: {
        encryption: true,
        loginPrivateKey: 'siamIT9999',
    },
    pool: {
        max: 15,
        min: 5,
        idle: 20000,
        evict: 15000,
        acquire: 30000,
    },
    benchmark: true,
    omiseConfig: {
        secretKey: 'skey_test_5p3j5dqd18pcn3wqhak',
    },
    imagePath: {
        uploadEndpoint: 'http://localhost:3000/storage',
    },
};
//# sourceMappingURL=config.development.js.map