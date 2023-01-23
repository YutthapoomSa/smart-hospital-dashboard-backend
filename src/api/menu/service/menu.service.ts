import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Op, Sequelize } from 'sequelize';
import { DataBase } from './../../../database/database.providers';
import { LogService } from './../../../helper/services/log.service';
import { CreateMenuDTO } from '../dto/create-menu.dto';
import { UpdateMenuDTO } from '../dto/update-menu.dto';
import { MenuDB } from './../../../database/entity/menu.entity';
import { UserDB, UserDBRole } from './../../../database/entity/user.entity';

@Injectable()
export class MenuService implements OnApplicationBootstrap {
    private logger = new LogService(MenuService.name);

    constructor(
        @Inject(DataBase.MenuDB) private readonly menuRepositoryModel: typeof MenuDB,
        @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    ) {}

    onApplicationBootstrap() {
        //
    }

    // [Function]─────────────────────────────────────────────────────────────

    async create(body: CreateMenuDTO, user: UserDB) {
        const tag = this.create.name;
        try {
            if (String(user.role) !== String(UserDBRole.admin))
                throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
            if (!body) throw new Error('data is required');

            const menuCreate = new MenuDB();
            menuCreate.menu_name = body.menu_name;
            menuCreate.menu_icon = body.menu_icon;
            menuCreate.url = body.url;

            await menuCreate.save();
            return menuCreate;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ─────────────────────────────────────────────────────────────────────

    async update(menu_id: number, updateMenuDto: UpdateMenuDTO, user: UserDB) {
        const tag = this.update.name;
        try {
            if (String(user.role) !== String(UserDBRole.admin))
                throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
            if (!menu_id) throw new Error('id is required');
            if (!updateMenuDto) throw new Error('updateMenuDto is required');

            const resultUpdate = await this.menuRepositoryModel.findByPk(menu_id);
            if (!resultUpdate) throw new Error('may be is wrong id try again later');

            const updateMenu = await resultUpdate.update(
                {
                    menu_name: updateMenuDto.menu_name,
                    menu_icon: updateMenuDto.menu_icon,
                    url: updateMenuDto.url,
                },
                {
                    where: {
                        menu_id: menu_id,
                    },
                },
            );
            console.log(updateMenu);

            return updateMenu;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ─────────────────────────────────────────────────────────────────────

    async findAll() {
        const tag = this.findAll.name;
        try {
            const isFind = await this.menuRepositoryModel.count({});

            if (isFind <= 0) {
                throw new Error('no data try again later...');
            }

            const resultFindAllMenu = await this.menuRepositoryModel.findAll();

            return resultFindAllMenu;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ─────────────────────────────────────────────────────────────────────

    async findOne(menu_id: number) {
        const tag = this.findAll.name;
        try {
            if (!menu_id) throw new Error('menu_id is required');

            const result = await this.menuRepositoryModel.findByPk(menu_id);
            if (!result) {
                throw new Error('not found');
            }

            return result;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(menu_id: number) {
        const tag = this.remove.name;
        try {
            if (!menu_id) throw new Error('id is required');
            const isFindResult = await this.menuRepositoryModel.findByPk(menu_id);
            if (!isFindResult) throw new Error('may be is wrong id try again later');
            const removeResult = await this.menuRepositoryModel.destroy({ where: { menu_id: menu_id } });

            if (removeResult === 1) {
                return `remove ResultRider Id : ${menu_id} success`;
            } else {
                throw new Error('something went wrong please try again later...');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
