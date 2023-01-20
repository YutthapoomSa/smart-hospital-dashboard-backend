import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { LogService } from './../../helper/services/log.service';
import { ResStatus } from './../../shared/enum/res-status.enum';
import { FindAllSubMenuResDTO } from './dto/findAll-SubMenu.dto';
import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';
import { SubMenuRepository } from './sub-menu.repository';

@Injectable()
export class SubMenuService implements OnApplicationBootstrap {
    private logger = new LogService(SubMenuService.name);

    constructor(private subMenuRepository: SubMenuRepository) {}

    onApplicationBootstrap() {
        //
    }

    // ─────────────────────────────────────────────────────────────

    

    async findAll() {
        const tag = this.findAll.name;
        try {
            const resultFindAll = await this.subMenuRepository.findAll();
            return new FindAllSubMenuResDTO(ResStatus.success, '', resultFindAll);
        } catch (error) {
            console.error(error);
        }
    }

    async findOne(id: number) {
        const tag = this.findOne.name;
        try {
            const resultFindOne = await this.subMenuRepository.findOne(id);
            return resultFindOne;
        } catch (error) {
            console.error(error);
        }
    }

    update(id: number, updateSubMenuDto: UpdateSubMenuDto) {
        return `This action updates a #${id} subMenu`;
    }

    remove(id: number) {
        return `This action removes a #${id} subMenu`;
    }
}
