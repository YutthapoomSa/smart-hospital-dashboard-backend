"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_pipe_1 = require("./helper/pipe/validation.pipe");
const core_1 = require("@nestjs/core");
const express_1 = require("express");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
const compression = require("compression");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useStaticAssets((0, path_1.join)(__dirname, '/upload'), { prefix: '/storage' });
        app.useStaticAssets((0, path_1.join)(__dirname, '/upload-qr'), { prefix: '/qr' });
        app.enableCors({
            origin: '*',
            methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
            allowedHeaders: 'Content-Type, Accept,Option, Authorization',
            maxAge: 3600,
        });
        app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
        app.use((0, express_1.json)({ limit: '300mb' }));
        app.use(compression());
        app.use((0, express_1.urlencoded)({ extended: true, limit: '300mb' }));
        app.set('x-powered-by', false);
        (0, swagger_1.setupSwagger)(app);
        yield app.listen(3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map