import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { CreateSubMenuReqDTO, CreateSubmenuResDTOData } from './create-sub-menu.dto';
import { MenuListDTO } from './findAll-SubMenu.dto';

export class UpdateSubMenuDto extends PartialType(CreateSubMenuReqDTO) { }

export class UpdateSubMenuResDTOData extends PartialType(CreateSubmenuResDTOData) { }

export class UpdateSubMenuResDTO {
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
            this.resData.submenuId = datas.submenuId;
            this.resData.submenuName = datas.submenuName;
            this.resData.submenuIcon = datas.submenuIcon;
            this.resData.url = datas.url;
            this.resData.menuLists = [];

            if (!!this.resData.menuLists && this.resData.menuLists.length > 0)
                for (const iterator2 of this.resData.menuLists) {
                    const _data2 = new MenuListDTO();
                    _data2.menuId = iterator2.menuId;
                    _data2.menuName = iterator2.menuName;
                    this.resData.menuLists.push(iterator2);
                }
        }
    }
}
