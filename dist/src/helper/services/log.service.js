"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const moment_1 = __importDefault(require("moment"));
const winston = __importStar(require("winston"));
class LogService {
    constructor(tags) {
        this.tags = tags;
        this.tag = '';
        this.logger = winston.createLogger({
            level: 'debug',
            format: winston.format.simple(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'log/error.log',
                    level: 'error',
                }),
                new winston.transports.File({ filename: 'log/debug.log' }),
            ],
        });
        this.tag = tags;
    }
    getDate() {
        return (0, moment_1.default)().format();
    }
    info(...args) {
        this.logger.info(`[${this.getDate()}][${this.tag}] => ${this.toString(args)} `);
    }
    debug(...args) {
        this.logger.debug(`[${this.getDate()}][${this.tag}] => ${this.toString(args)} `);
    }
    warn(...args) {
        this.logger.warn(`[${this.getDate()}][${this.tag}] => ${this.toString(args)} `);
    }
    error(...args) {
        console.log(`[${this.getDate()}][${this.tag}] =>  `, args);
        this.logger.error(`[${this.getDate()}][${this.tag}] =>  ${this.toString(args)} `);
    }
    toString(args) {
        let str = '';
        for (const key in args) {
            if (args.hasOwnProperty(key)) {
                const element = args[key];
                if (typeof element === 'object') {
                    try {
                        str += JSON.stringify(element) + ' ';
                    }
                    catch (error) {
                        console.error(error);
                        console.log(element);
                    }
                }
                else {
                    str += element + ' ';
                }
            }
        }
        return str;
    }
}
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map