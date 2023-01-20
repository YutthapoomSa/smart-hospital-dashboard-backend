"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ConvertImageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertImageService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const config_service_1 = require("../../shared/config/config.service");
const log_service_1 = require("./log.service");
const webp = require('webp-converter');
let ConvertImageService = ConvertImageService_1 = class ConvertImageService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new log_service_1.LogService(ConvertImageService_1.name);
    }
    onApplicationBootstrap() {
        this.isQrDir();
    }
    fileToWebP(fileName) {
        return new Promise((resolve, reject) => {
            try {
                if (!fs_1.default.existsSync(fileName.path))
                    return null;
                const fileNameOutPut = `${(0, uuid_1.v4)()}.webp`;
                const fileOutPut = `${fileName.destination}/${fileNameOutPut}`;
                const result = webp.cwebp(`${fileName.path}`, fileOutPut, '-q 80');
                result.then((response) => {
                    fs_1.default.unlinkSync(fileName.path);
                    const json = {
                        fileName: fileNameOutPut,
                        destination: `${fileName.destination}`,
                        path: fileOutPut,
                    };
                    return resolve(json);
                });
            }
            catch (error) {
                this.logger.error(error);
                return reject(error);
            }
        });
    }
    base64ToWebp(dataBase64, type) {
        const _destination = path_1.default.join(__dirname, '../../upload');
        return new Promise((resolve, reject) => {
            try {
                const _base64Image = dataBase64.split(';base64,').pop();
                const fullPath = `${_destination}/${(0, uuid_1.v4)()}.${type.toLocaleLowerCase()}`;
                fs_1.default.writeFileSync(fullPath, _base64Image, {
                    encoding: 'base64',
                });
                const multer = {
                    destination: _destination,
                    path: fullPath,
                };
                this.fileToWebP(multer)
                    .then((resp) => {
                    return resolve(resp);
                })
                    .catch((err) => {
                    return reject(err);
                });
            }
            catch (error) {
                this.logger.error(error);
                return reject(error);
            }
        });
    }
    getLinkImage(img) {
        if (!img)
            return null;
        return this.configService.genPointUpload.endpoint + '/' + img;
    }
    isQrDir() {
        const _destination = path_1.default.join(__dirname, '../../upload');
        if (!fs_1.default.existsSync(_destination)) {
            this.logger.debug(`${this.isQrDir.name} -> create upload dir.`);
            fs_1.default.mkdirSync(_destination);
        }
    }
};
ConvertImageService = ConvertImageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], ConvertImageService);
exports.ConvertImageService = ConvertImageService;
//# sourceMappingURL=convert-image.service.js.map