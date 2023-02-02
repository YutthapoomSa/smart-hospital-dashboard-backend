import { ApiProperty } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class FindAllMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    icon: string;
    @ApiProperty()
    iframeMenu: string;
    @ApiProperty({ type: () => [SubMenuData] })
    subMenuLists: SubMenuData[];
}

export class SubMenuData {
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
            console.log(JSON.stringify(datas, null, 2));
            for (const iterator of datas) {
                console.log(JSON.stringify(iterator, null, 2));
                const _data = new FindAllMenuResDTOData();
                _data.menuId = iterator.menuId;
                _data.menuName = iterator.menuName;
                _data.icon = iterator.icon;
                _data.iframeMenu = iterator.iframeMenu;
                _data.subMenuLists = [];
                if (!!iterator.subMenuLists) {
                    const submenuList = new SubMenuData();
                    submenuList.submenuId = iterator.subMenuLists.submenuId;
                    submenuList.submenuName = iterator.subMenuLists.submenuName;
                    submenuList.submenuIcon = iterator.subMenuLists.submenuIcon;
                    submenuList.iframe = iterator.subMenuLists.iframe;
                    submenuList.link = iterator.subMenuLists.link;
                    submenuList.page = iterator.subMenuLists.page;
                    _data.subMenuLists.push(submenuList);
                }
                this.resData.push(_data);
            }
        }
    }
}
