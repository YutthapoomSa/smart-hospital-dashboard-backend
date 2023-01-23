import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { LogService } from './../../helper/services/log.service';
import { DataBase } from './../../database/database.providers';
import { Sequelize } from 'sequelize-typescript';
import { SubMenuDB } from './../../database/entity/sub-menu.entity';
import { CreateSubMenuReqDTO } from './dto/create-sub-menu.dto';
import { UserDB, UserDBRole } from './../../database/entity/user.entity';
import { MenuDB } from 'src/database/entity/menu.entity';
import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';
@Injectable()
export class SubMenuRepository implements OnApplicationBootstrap {
    private logger = new LogService(SubMenuRepository.name);

    constructor(
        @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
        @Inject(DataBase.SubMenuDB) private readonly subMenuRepositoryModel: typeof SubMenuDB,
    ) {}

    onApplicationBootstrap() {
        //
    }
    // ─────────────────────────────────────────────────────────────────────────────

    async create(body: CreateSubMenuReqDTO, user: UserDB) {
        const tag = this.create.name;
        try {
            if (String(user.role) !== String(UserDBRole.admin))
                throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
            if (!body) throw new Error('No Data Try Again Later...');

            const createSubMenu = await this.subMenuRepositoryModel.count({
                where: {
                    submenu_name: body.submenu_name,
                    submenu_icon: body.submenu_icon,
                    url: body.url,
                    menu_id: body.menu_id,
                },
            });

            if (createSubMenu > 0) throw new Error('This submenu has exists !!...');

            const _create = new SubMenuDB();
            _create.submenu_name = body.submenu_name;
            _create.submenu_icon = body.submenu_icon;
            _create.url = body.url;
            _create.menu_id = body.menu_id;
            await _create.save();

            return _create;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(submenu_id: number, body: UpdateSubMenuDto, user: UserDB) {
        const tag = this.update.name;
        try {
            if (String(user.role) !== String(UserDBRole.admin))
                throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);

            const resultUpdate = await this.subMenuRepositoryModel.findByPk(submenu_id);
            if (!resultUpdate) throw new Error('may be is wrong id try again later');

            const updateSubmenu = await resultUpdate.update(
                {
                    submenu_name: body.submenu_name,
                    submenu_icon: body.submenu_icon,
                    url: body.url,
                    menu_id: body.menu_id,
                },
                {
                    where: {
                        submenu_id: submenu_id,
                    },
                },
            );
            console.log(JSON.stringify(updateSubmenu, null, 2));
            return updateSubmenu;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const result = await this.subMenuRepositoryModel.findAll();
            if (!result) throw new Error('no data found try again later');
            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async findOne(submenu_id: number) {
        const tag = this.findOne.name;
        try {
            if (!submenu_id) throw new Error('id is required');

            const result = await this.subMenuRepositoryModel.findByPk(submenu_id, {
                include: [
                    {
                        model: MenuDB,
                        attributes: ['menu_id,menu_name'],
                    },
                ],
            });
            console.log(JSON.stringify(result, null, 2));
            if (!result) throw new Error('no data found');
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async remove(submenu_id: number) {
        const tag = this.remove.name;
        try {
            const isFindSubmenuDetailById = await this.subMenuRepositoryModel.count({ where: { submenu_id: submenu_id } });
            if (isFindSubmenuDetailById === 0) {
                throw new Error('can not remove this title maybe is invalid id');
            }
            const resultRemoveSubMenuDetailById = await this.subMenuRepositoryModel.destroy({ where: { submenu_id: submenu_id } });
            if (resultRemoveSubMenuDetailById === 1) {
                return `remove subMenuDetail Id : ${submenu_id} success`;
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
