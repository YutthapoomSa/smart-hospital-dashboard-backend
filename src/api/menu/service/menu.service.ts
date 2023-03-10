import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Op, Sequelize } from 'sequelize';
import { DataBase } from './../../../database/database.providers';
import { LogService } from './../../../helper/services/log.service';
import { CreateMenuDTO } from '../dto/create-menu.dto';
import { UpdateMenuDTO } from '../dto/update-menu.dto';
import { UserDB, UserDBRole } from './../../../database/entity/user.entity';
import { SubMenuDB } from 'src/database/entity/sub-menu.entity';
import { MenuDB } from 'src/database/entity/menu.entity';

@Injectable()
export class MenuService implements OnApplicationBootstrap {
    private logger = new LogService(MenuService.name);

    constructor(
        @Inject(DataBase.MenuDB) private readonly menuRepositoryModel: typeof MenuDB,
        @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    ) { }

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
            menuCreate.menuName = body.menuName;
            menuCreate.iframeMenu = body.iframeMenu;
            await menuCreate.save();
            return menuCreate;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ─────────────────────────────────────────────────────────────────────

    async update(_menuId: number, updateMenuDto: UpdateMenuDTO, user: UserDB) {
        const tag = this.update.name;
        try {
            if (String(user.role) !== String(UserDBRole.admin))
                throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
            if (!_menuId) throw new Error('id is required');
            if (!updateMenuDto) throw new Error('updateMenuDto is required');

            const resultUpdate = await this.menuRepositoryModel.findByPk(_menuId);
            if (!resultUpdate) throw new Error('may be is wrong id try again later');

            // const updateMenu = await resultUpdate.update(
            //     {
            //         menuName: updateMenuDto.menuName ? updateMenuDto.menuName : resultUpdate.menuName,
            //         iframeMenu: updateMenuDto.iframeMenu ? updateMenuDto.iframeMenu : resultUpdate.iframeMenu,
            //         submenuId: updateMenuDto.submenuId ? updateMenuDto.submenuId : resultUpdate.submenuId,
            //     },
            //     {
            //         where: {
            //             menuId: _menuId,
            //         },
            //     },
            // );

            resultUpdate.menuName = updateMenuDto.menuName ? updateMenuDto.menuName : resultUpdate.menuName;
            resultUpdate.iframeMenu = updateMenuDto.iframeMenu ? updateMenuDto.iframeMenu : resultUpdate.iframeMenu;

            await resultUpdate.save();

            console.log(resultUpdate);

            return resultUpdate;
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

            const resultFindAllMenu = await this.menuRepositoryModel.findAll({
                include: [
                    {
                        model: SubMenuDB,
                        attributes: ['id', 'submenuName', 'submenuIcon', 'iframe', 'link', 'page'],
                    },
                ],
            });

            console.log('resultFindAllMenu : ', JSON.stringify(resultFindAllMenu, null, 2))
            return resultFindAllMenu;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ─────────────────────────────────────────────────────────────────────

    async findOne(menuId: number) {
        const tag = this.findAll.name;
        try {
            if (!menuId) throw new Error('menu_id is required');

            const result = await this.menuRepositoryModel.findByPk(menuId, {
                include: [
                    {
                        model: SubMenuDB,
                        attributes: ['id', 'submenuName', 'submenuIcon', 'iframe', 'link', 'page'],
                    },
                ],
            });
            return result;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(_menuId: number) {
        const tag = this.remove.name;
        try {
            if (!_menuId) throw new Error('id is required');
            const isFindResult = await this.menuRepositoryModel.findByPk(_menuId);
            if (!isFindResult) throw new Error('may be is wrong id try again later');
            const removeResult = await this.menuRepositoryModel.destroy({ where: { id: _menuId } });

            if (removeResult === 1) {
                return `remove ResultRider Id : ${_menuId} success`;
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
