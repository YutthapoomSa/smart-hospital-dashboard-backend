import { UserDB } from './../../database/entity/user.entity';
import { CreateMenuDTO, CreateMenuResDTO } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiMenuService } from './service/api-menu.service';
import { MenuService } from './service/menu.service';
export declare class MenuController {
    private readonly menuService;
    private readonly apiMenuService;
    constructor(menuService: MenuService, apiMenuService: ApiMenuService);
    create(user: UserDB, body: CreateMenuDTO): Promise<CreateMenuResDTO>;
    update(menu_id: number, updateMenuDto: UpdateMenuDto): Promise<CreateMenuResDTO>;
    findOne(menu_id: number): Promise<import("../../database/entity/menu.entity").MenuDB>;
    findAll(): Promise<import("../../database/entity/menu.entity").MenuDB[]>;
}
