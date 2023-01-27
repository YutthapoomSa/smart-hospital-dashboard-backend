import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { UpdateMenuResDTOData } from './update-menu.dto';

export class FindAllMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty({ type: () => [SubMenuData] })
    subMenuList: SubMenuData[];
}

export class SubMenuData {
    @ApiProperty()
    subMenuId: number;
    @ApiProperty()
    subMenuName: string;
}

export class FindAllMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [FindAllMenuResDTOData],
        description: 'ข้อมูล',
    })
    resData: FindAllMenuResDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _data = new FindAllMenuResDTOData();
                _data.menuId = iterator.menuId;
                _data.menuName = iterator.menuName;
                _data.iframe = iterator.iframe;
                _data.subMenuList = [];

                if (!!_data.subMenuList && _data.subMenuList.length > 0) {
                    for (const iterator2 of _data.subMenuList) {
                        const _data2 = new SubMenuData();
                        _data2.subMenuId = iterator2.subMenuId;
                        _data2.subMenuName = iterator2.subMenuName;
                        _data.subMenuList.push(_data2);
                    }
                    this.resData.push(_data);
                }
            }
        }
    }
}
