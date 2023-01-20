"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_development_1 = require("./config/config.development");
const config_production_1 = require("./config/config.production");
exports.default = process.env.NODE_ENV === "production" ? config_production_1.config : config_development_1.config;
//# sourceMappingURL=config.js.map