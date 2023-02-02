import { ApiProperty } from '@nestjs/swagger';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class FindAllSubMenuResDTOData {
    @ApiProperty()
    submenuId: number;
    @ApiProperty()
    submenuName: string;
    @ApiProperty()
    submenuIcon: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty()
    link: string;
    @ApiProperty()
    page: string;
    @ApiProperty()
    menuId: number
    @ApiProperty()
    menuName: string;
}
export class FindAllSubMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [FindAllSubMenuResDTOData],
        description: 'ข้อมูล',
    })
    resData: FindAllSubMenuResDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];
        // const config = new ConfigService();

        if (!!datas) {
            for (const iterator of datas) {
                console.log('findAllSub : ', JSON.stringify(iterator, null, 2))
                const _data = new FindAllSubMenuResDTOData();
                _data.submenuId = iterator.id;
                _data.submenuName = iterator.submenuName;
                _data.submenuIcon = iterator.submenuIcon;
                _data.iframe = iterator.iframe;
                _data.link = iterator.link;
                _data.page = iterator.page;
                _data.menuId = iterator.menuId;
                _data.menuName = iterator.menuLists.menuName;


                this.resData.push(_data);
            }
        }
    }
}
