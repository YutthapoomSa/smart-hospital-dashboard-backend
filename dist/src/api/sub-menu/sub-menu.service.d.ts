import { OnApplicationBootstrap } from '@nestjs/common';
import { FindAllSubMenuResDTO } from './dto/findAll-SubMenu.dto';
import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';
import { SubMenuRepository } from './sub-menu.repository';
export declare class SubMenuService implements OnApplicationBootstrap {
    private subMenuRepository;
    private logger;
    constructor(subMenuRepository: SubMenuRepository);
    onApplicationBootstrap(): void;
    findAll(): Promise<FindAllSubMenuResDTO>;
    findOne(id: number): Promise<import("../../database/entity/sub-menu.entity").SubMenuDB>;
    update(id: number, updateSubMenuDto: UpdateSubMenuDto): string;
    remove(id: number): string;
}
