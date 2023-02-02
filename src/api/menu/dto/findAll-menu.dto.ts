import { ApiProperty } from '@nestjs/swagger';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class FindAllMenuResDTOData {
    @ApiProperty()
    id: number;
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

        console.log('Data : ', JSON.stringify(datas, null, 2));

        if (!!datas && datas.length > 0) {
            console.log(JSON.stringify(datas, null, 2));
            for (const iterator of datas) {
                console.log(JSON.stringify(iterator, null, 2));
                const _data = new FindAllMenuResDTOData();
                _data.id = iterator.id;
                _data.menuName = iterator.menuName;
                _data.icon = iterator.icon;
                _data.iframeMenu = iterator.iframeMenu;
                _data.subMenuLists = [];
                for (const iterator2 of iterator.SubMenuLists) {
                    const submenuList = new SubMenuData()
                    submenuList.submenuId = iterator2.id
                    submenuList.submenuName = iterator2.submenuName
                    submenuList.iframe = iterator2.iframe
                    submenuList.link = iterator2.link
                    submenuList.submenuIcon = iterator2.submenuIcon

                    _data.subMenuLists.push(submenuList);
                }

                this.resData.push(_data);
            }
        }
    }
}
