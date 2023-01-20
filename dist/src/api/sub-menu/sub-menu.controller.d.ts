import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';
import { SubMenuService } from './sub-menu.service';
export declare class SubMenuController {
    private readonly subMenuService;
    constructor(subMenuService: SubMenuService);
    findAll(): Promise<import("./dto/findAll-SubMenu.dto").FindAllSubMenuResDTO>;
    findOne(submenu_id: number): Promise<import("../../database/entity/sub-menu.entity").SubMenuDB>;
    update(id: string, updateSubMenuDto: UpdateSubMenuDto): string;
    remove(id: string): string;
}
