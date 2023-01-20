/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { DataBase } from 'src/database/database.providers';
import { LogService } from 'src/helper/services/log.service';
import { CreateMenuDTO, CreateMenuResDTO } from '../dto/create-menu.dto';
import { MenuDB } from './../../../database/entity/menu.entity';
import { MenuService } from './menu.service';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { UserDB } from './../../../database/entity/user.entity';

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
}
