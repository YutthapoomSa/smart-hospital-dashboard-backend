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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuDB = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const menu_entity_1 = require("./menu.entity");
let SubMenuDB = class SubMenuDB extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'unique_sub_menu_id',
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], SubMenuDB.prototype, "submenu_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], SubMenuDB.prototype, "submenu_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
    }),
    __metadata("design:type", String)
], SubMenuDB.prototype, "submenu_icon", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], SubMenuDB.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => menu_entity_1.MenuDB),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: 'menu_id',
    }),
    __metadata("design:type", Number)
], SubMenuDB.prototype, "menu_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => menu_entity_1.MenuDB),
    __metadata("design:type", Array)
], SubMenuDB.prototype, "menuLists", void 0);
SubMenuDB = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sub_menu',
        comment: 'ตารางข้อมูล เมนูย่อย',
    })
], SubMenuDB);
exports.SubMenuDB = SubMenuDB;
//# sourceMappingURL=sub-menu.entity.js.map