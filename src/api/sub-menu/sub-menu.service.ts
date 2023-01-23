import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { LogService } from './../../helper/services/log.service';
import { ResStatus } from './../../shared/enum/res-status.enum';
import { CreateSubMenuResDTO, CreateSubMenuReqDTO } from './dto/create-sub-menu.dto';
import { FindAllSubMenuResDTO } from './dto/findAll-SubMenu.dto';
import { UpdateSubMenuDto, UpdateSubMenuResDTO } from './dto/update-sub-menu.dto';
import { SubMenuRepository } from './sub-menu.repository';
import { UserDB } from './../../database/entity/user.entity';
import { FindOneMenuResDTO } from './dto/findOne-subMenu.dto';
import { GlobalResDTO } from './../global-dto/global-res.dto';

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

    async findOne(submenu_id: number) {
        const tag = this.findOne.name;
        try {
            const resultFindOne = await this.subMenuRepository.findOne(submenu_id);
            return new FindOneMenuResDTO(ResStatus.success, '', resultFindOne);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(submenu_id: number, body: UpdateSubMenuDto, user: UserDB) {
        const tag = this.update.name;
        try {
            let res: UpdateSubMenuResDTO = null;
            await this.subMenuRepository
                .update(submenu_id, body, user)
                .then((response: any) => {
                    console.log('response ', response);
                    res = new UpdateSubMenuResDTO(ResStatus.success, 'อัพเดตเมนูสำเร็จ', response);
                })
                .catch((error: any) => {
                    console.error(error);
                    res = new UpdateSubMenuResDTO(ResStatus.fail, 'กรุณาตรวจสอบความถูกต้องของข้อมูล', null);
                });
            return res;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(submenu_id: number) {
        const tag = this.remove.name;
        try {
            const resultRemoveSubMenuDetailById = await this.subMenuRepository.remove(submenu_id);
            return new GlobalResDTO(ResStatus.success, resultRemoveSubMenuDetailById);
            // return resultRemoveTitleDetailById;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
