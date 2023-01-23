import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SubMenuDB } from 'src/database/entity/sub-menu.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { CreateSubMenuReqDTO, CreateSubmenuResDTOData } from './create-sub-menu.dto';
import { MenuListDTO } from './findAll-SubMenu.dto';

export class UpdateSubMenuDto extends PartialType(CreateSubMenuReqDTO) {}

export class UpdateSubMenuResDTOData extends PartialType(CreateSubmenuResDTOData) {}

export class UpdateSubMenuResDTO{
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateSubMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateSubMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateSubMenuResDTOData();

        if (!!datas) {
            this.resData.submenu_id = datas.submenu_id;
            this.resData.submenu_name = datas.submenu_name;
            this.resData.submenu_icon = datas.submenu_icon;
            this.resData.url = datas.url;
            this.resData.menuLists = [];

            if (!!this.resData.menuLists && this.resData.menuLists.length > 0)
                for (const iterator2 of this.resData.menuLists) {
                    const _data2 = new MenuListDTO();
                    _data2.menu_id = iterator2.menu_id;
                    _data2.menu_name = iterator2.menu_name;
                    this.resData.menuLists.push(iterator2);
                }
        }
    }
}
