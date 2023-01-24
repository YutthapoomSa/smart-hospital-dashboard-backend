import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserDB } from './../../database/entity/user.entity';
import { LogService } from './../../helper/services/log.service';
import { ResStatus } from './../../shared/enum/res-status.enum';
import { GlobalResDTO } from './../global-dto/global-res.dto';
import { CreateSubMenuReqDTO, CreateSubMenuResDTO } from './dto/create-sub-menu.dto';
import { FindAllSubMenuResDTO } from './dto/findAll-SubMenu.dto';
import { FindOneMenuResDTO } from './dto/findOne-subMenu.dto';
import { UpdateSubMenuDTO } from './dto/update-sub-menu.dto';
import { SubMenuRepository } from './sub-menu.repository';

@Injectable()
export class SubMenuService implements OnApplicationBootstrap {
    private logger = new LogService(SubMenuService.name);

    constructor(private subMenuRepository: SubMenuRepository) {}

    onApplicationBootstrap() {
        //
    }

    // ─────────────────────────────────────────────────────────────

    async create(body: CreateSubMenuReqDTO, user: UserDB): Promise<CreateSubMenuResDTO> {
        const tag = this.create.name;
        try {
            const resultCreate = await this.subMenuRepository.create(body, user);
            return new CreateSubMenuResDTO(ResStatus.success, '', resultCreate);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const resultFindAll = await this.subMenuRepository.findAll();
            return new FindAllSubMenuResDTO(ResStatus.success, '', resultFindAll);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(_submenuId: number) {
        const tag = this.findOne.name;
        try {
            const resultFindOne = await this.subMenuRepository.findOne(_submenuId);
            return new FindOneMenuResDTO(ResStatus.success, '', resultFindOne);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(body: UpdateSubMenuDTO, user: UserDB) {
        const tag = this.update.name;
        try {
            const updateSubmenu = await this.subMenuRepository.update(body, user);
            return updateSubmenu;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(_submenuId: number) {
        const tag = this.remove.name;
        try {
            const resultRemoveSubMenuDetailById = await this.subMenuRepository.remove(_submenuId);
            return new GlobalResDTO(ResStatus.success, resultRemoveSubMenuDetailById);
            // return resultRemoveTitleDetailById;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
