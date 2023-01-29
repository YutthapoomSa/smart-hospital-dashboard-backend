import { ApiProperty } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class FindAllMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty({ type: () => [SubMenuData] })
    subMenuLists: SubMenuData[];
}

export class SubMenuData {
    @ApiProperty()
    submenuId: number;
    @ApiProperty()
    submenuName: string;
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

        // console.log(JSON.stringify(datas, null, 2));

        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _data = new FindAllMenuResDTOData();
                _data.menuId = iterator.menuId;
                _data.menuName = iterator.menuName;
                _data.iframe = iterator.iframe;
                _data.subMenuLists = [];

                if (!!iterator.subMenuLists && iterator.subMenuLists.length > 0) {
                    for (const iterator2 of iterator.subMenuLists) {
                        const _data2 = new SubMenuData();
                        _data2.submenuId = iterator2.submenuId;
                        _data2.submenuName = iterator2.submenuName;
                        _data.subMenuLists.push(_data2);
                    }
                    this.resData.push(_data);
                }
            }
        }
    }
}
