import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { MenuDB } from 'src/database/entity/menu.entity';
import { DataBase } from './../../database/database.providers';
import { SubMenuDB } from './../../database/entity/sub-menu.entity';
import { UserDB, UserDBRole } from './../../database/entity/user.entity';
import { LogService } from './../../helper/services/log.service';
import { CreateSubMenuReqDTO } from './dto/create-sub-menu.dto';
import { UpdateSubMenuDTO } from './dto/update-sub-menu.dto';
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
                    submenuName: body.submenuName,
                    submenuIcon: body.submenuIcon,
                    menuId: body.menuId,
                    iframe: body.iframe,
                    link: body.link,
                    page: body.page,
                },
            });

            if (createSubMenu > 0) throw new Error('This submenu has exists !!...');

            const _create = new SubMenuDB();
            _create.submenuName = body.submenuName;
            _create.submenuIcon = body.submenuIcon;
            _create.menuId = body.menuId;
            _create.iframe = body.iframe;
            _create.link = body.link;
            _create.page = body.page;
            await _create.save();

            return _create;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(body: UpdateSubMenuDTO, user: UserDB) {
        const tag = this.update.name;
        try {
            if (String(user.role) !== String(UserDBRole.admin))
                throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);

            const resultUpdate = await this.subMenuRepositoryModel.findByPk(body.submenuId);
            if (!resultUpdate) throw new Error('may be is wrong id try again later');

            resultUpdate.submenuName = body.submenuName ? body.submenuName : resultUpdate.submenuName;
            resultUpdate.submenuIcon = body.submenuIcon ? body.submenuIcon : resultUpdate.submenuIcon;
            resultUpdate.menuId = body.menuId ? body.menuId : resultUpdate.menuId;
            resultUpdate.iframe = body.iframe ? body.iframe : resultUpdate.iframe;
            resultUpdate.link = body.link ? body.link : resultUpdate.link;
            resultUpdate.page = body.page ? body.page : resultUpdate.page;

            return await resultUpdate.save();
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const result = await this.subMenuRepositoryModel.findAll({
                include: [
                    {
                        model: MenuDB,
                        attributes: ['menu_id', 'menu_name'],
                    },
                ],
            });
            if (!result) throw new Error('no data found try again later');
            console.log(JSON.stringify(result, null, 2));
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async findOne(_submenuId: number) {
        const tag = this.findOne.name;
        try {
            if (!_submenuId) throw new Error('id is required');

            const result = await this.subMenuRepositoryModel.findByPk(_submenuId, {
                include: [
                    {
                        model: MenuDB,
                        attributes: ['menu_id', 'menu_name'],
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

    async remove(_submenuId: number) {
        const tag = this.remove.name;
        try {
            const isFindSubmenuDetailById = await this.subMenuRepositoryModel.count({
                where: { submenuId: _submenuId },
            });
            if (isFindSubmenuDetailById === 0) {
                throw new Error('can not remove this title maybe is invalid id');
            }
            const resultRemoveSubMenuDetailById = await this.subMenuRepositoryModel.destroy({
                where: { submenuId: _submenuId },
            });
            if (resultRemoveSubMenuDetailById === 1) {
                return `remove subMenuDetail Id : ${_submenuId} success`;
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
