import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { LogService } from './../../helper/services/log.service';
import { DataBase } from './../../database/database.providers';
import { Sequelize } from 'sequelize-typescript';
import { SubMenuDB } from './../../database/entity/sub-menu.entity';
import { CreateSubMenuReqDTO } from './dto/create-sub-menu.dto';
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

    // async create(createSubMenuDto: CreateSubMenuReqDTO) {
    //     const tag = this.create.name;
    //     try {
    //         if (!createSubMenuDto) throw new Error('No Data Try Again Later...');

    //         const createSUbMenu = await this.subMenuRepositoryModel.count({
    //             where: {
    //                 submenu_name: createSubMenuDto.submenu_name,
    //             },
    //         });

    //         if (createSUbMenu > 0) throw new Error('This submenu has exists !!...');

    //         const _create = new SubMenuDB();
    //         _create.submenu_name = createSubMenuDto.submenu_name;
    //         _create.submenu_icon = createSubMenuDto.submenu_icon;
    //         _create.url = createSubMenuDto.url;

    //     } catch (error) {
    //         console.error(`${tag} -> `, error);
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

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

    async findOne(id: number) {
        const tag = this.findOne.name;
        try {
            const result = await this.subMenuRepositoryModel.findByPk(id);
            if (!result) throw new Error('no data found');
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}
