import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { UpdateMenuResDTOData } from './update-menu.dto';

export class FindOneMenuResDTOData {
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

export class FindOneMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindOneMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindOneMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = null;

        if (!!datas) {
            const _data = new FindOneMenuResDTOData();
            _data.menuId = datas.menuId;
            _data.menuName = datas.menuName;
            _data.iframe = datas.iframe;
            _data.subMenuList = [];

            if (!!_data.subMenuList && _data.subMenuList.length > 0) {
                for (const iterator of _data.subMenuList) {
                    const _data2 = new SubMenuData();
                    _data2.subMenuId = iterator.subMenuId;
                    _data2.subMenuName = iterator.subMenuName;
                    _data.subMenuList.push(_data2);
                }
                this.resData = _data;
            }
        }
    }
}
