"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuModule = void 0;
const common_1 = require("@nestjs/common");
const sub_menu_service_1 = require("./sub-menu.service");
const sub_menu_controller_1 = require("./sub-menu.controller");
const shared_module_1 = require("./../../shared/shared.module");
const sub_menu_repository_1 = require("./sub-menu.repository");
let SubMenuModule = class SubMenuModule {
};
SubMenuModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule],
        controllers: [sub_menu_controller_1.SubMenuController],
        providers: [sub_menu_service_1.SubMenuService, sub_menu_repository_1.SubMenuRepository],
        exports: [sub_menu_service_1.SubMenuService, sub_menu_repository_1.SubMenuRepository],
    })
], SubMenuModule);
exports.SubMenuModule = SubMenuModule;
//# sourceMappingURL=sub-menu.module.js.map