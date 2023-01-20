import { OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { CreateMenuDTO } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { MenuDB } from './../../../database/entity/menu.entity';
import { UserDB } from './../../../database/entity/user.entity';
export declare class MenuService implements OnApplicationBootstrap {
    private readonly menuRepository;
    private readonly sequelize;
    private logger;
    constructor(menuRepository: typeof MenuDB, sequelize: Sequelize);
    onApplicationBootstrap(): void;
    create(body: CreateMenuDTO, user: UserDB): Promise<MenuDB>;
    update(menu_id: number, updateMenuDto: UpdateMenuDto): Promise<MenuDB>;
    findAll(): Promise<MenuDB[]>;
    findOne(menu_id: number): Promise<MenuDB>;
    remove(id: number): string;
}
