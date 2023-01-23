/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { DataBase } from './../../../database/database.providers';
import { LogService } from './../../../helper/services/log.service';
import { CreateMenuDTO, CreateMenuResDTO } from '../dto/create-menu.dto';
import { MenuDB } from './../../../database/entity/menu.entity';
import { MenuService } from './menu.service';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { UserDB } from './../../../database/entity/user.entity';
import { UpdateMenuDTO, UpdateMenuResDTO } from '../dto/update-menu.dto';
import { GlobalResDTO } from './../../../api/global-dto/global-res.dto';
import { FindOneMenuResDTO } from '../dto/findOne-menu.dto';
import { FindAllMenuResDTO } from '../dto/findAll-menu.dto';

@Injectable()
export class ApiMenuService implements OnApplicationBootstrap {
    private logger = new LogService(ApiMenuService.name);

    constructor(
        @Inject(DataBase.MenuDB) private menuRepository: typeof MenuDB,
        @Inject('SEQUELIZE') private sequelize: Sequelize,
        @Inject(forwardRef(() => MenuService))
        private menuService: MenuService,
    ) {}

    async onApplicationBootstrap() {
        //
    }

    //[Function]─────────────────────────────────────────────────────────────────────

    async api_create(body: CreateMenuDTO, user: UserDB): Promise<CreateMenuResDTO> {
        const tag = this.api_create.name;
        try {
            return new CreateMenuResDTO(ResStatus.success, '', await this.menuService.create(body, user));
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_update(menu_id: number, updateMenuDto: UpdateMenuDTO, user: UserDB) {
        const tag = this.api_update.name;
        try {
            let res: UpdateMenuResDTO = null;
            await this.menuService
                .update(menu_id, updateMenuDto, user)
                .then((response: any) => {
                    console.log('response ', response);
                    res = new UpdateMenuResDTO(ResStatus.success, 'อัพเดตเมนูสำเร็จ', response);
                })
                .catch((error: any) => {
                    console.error(error);
                    res = new UpdateMenuResDTO(ResStatus.fail, 'กรุณาตรวจสอบความถูกต้องของข้อมูล', null);
                });
            return res;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_findOne(menu_id: number) {
        const tag = this.api_update.name;
        try {
            const result = await this.menuService.findOne(menu_id);
            return new FindOneMenuResDTO(ResStatus.success, '', result);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async api_findAll() {
        const tag = this.api_findAll.name;
        try {
            const resultFindAll = await this.menuService.findAll();
            return new FindAllMenuResDTO(ResStatus.success, '', resultFindAll);
        } catch (error) {
            console.error(error);
        }
    }

    async api_remove(id: number) {
        const tag = this.api_remove.name;
        try {
            const removeResult = await this.menuService.remove(id);
            return new GlobalResDTO(ResStatus.success, '');
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
