import { OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { CreateMenuDTO, CreateMenuResDTO } from '../dto/create-menu.dto';
import { MenuDB } from './../../../database/entity/menu.entity';
import { MenuService } from './menu.service';
import { UserDB } from './../../../database/entity/user.entity';
import { UpdateMenuDto } from '../dto/update-menu.dto';
export declare class ApiMenuService implements OnApplicationBootstrap {
    private menuRepository;
    private sequelize;
    private menuService;
    private logger;
    constructor(menuRepository: typeof MenuDB, sequelize: Sequelize, menuService: MenuService);
    onApplicationBootstrap(): Promise<void>;
    api_create(body: CreateMenuDTO, user: UserDB): Promise<CreateMenuResDTO>;
    api_update(menu_id: number, updateMenuDto: UpdateMenuDto): Promise<CreateMenuResDTO>;
    api_findOne(menu_id: number): Promise<MenuDB>;
    api_findAll(): Promise<MenuDB[]>;
}
