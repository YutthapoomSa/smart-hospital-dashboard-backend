import { ApiProperty } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { SubMenuData } from './findAll-menu.dto';

export class FindOneMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    icon: string;
    @ApiProperty()
    iframeMenu: string;
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

    @ApiProperty({
        type: () => [SubMenuData]
    })
    submenuLists: SubMenuData[];
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
        this.resData = new FindOneMenuResDTOData();

        console.log(JSON.stringify(datas, null, 2));
        if (!!datas) {
            this.resData.menuId = datas.id;
            this.resData.menuName = datas.menuName;
            this.resData.icon = datas.icon;
            this.resData.iframeMenu = datas.iframeMenu;
            this.resData.submenuLists = [];
            for (const iterator of datas.SubMenuLists) {
                const submenuList = new SubMenuData()
                submenuList.submenuId = iterator.id
                submenuList.submenuName = iterator.submenuName
                submenuList.iframe = iterator.iframe
                submenuList.link = iterator.link
                submenuList.submenuIcon = iterator.submenuIcon

                this.resData.submenuLists.push(submenuList);
            }
        }
    }
}
