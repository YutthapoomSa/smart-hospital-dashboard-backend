import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class SubmenuData {
    @ApiProperty()
    id: number;
}
export class CreateMenuDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    menuName: string;

    @ApiProperty()
    @IsString()
    iframeMenu: string;

    @ApiProperty()
    @IsString()
    icon: string;

}

export class ResSubMenuData {
    @ApiProperty()
    submenuId: number;
}
export class CreateMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    icon: string;
    @ApiProperty()
    iframeMenu: string;
    @ApiProperty({ type: () => [ResSubMenuData] })
    submenuLists: ResSubMenuData[];
}

export class CreateMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateMenuResDTOData();

        if (!!datas) {
            this.resData.menuId = datas.id;
            this.resData.menuName = datas.menuName;
            this.resData.icon = datas.icon;
            this.resData.iframeMenu = datas.iframeMenu;
            this.resData.submenuLists = [];
            if (!!this.resData.submenuLists && this.resData.submenuLists.length > 0) {
                for (const iterator of this.resData.submenuLists) {
                    const _data = new ResSubMenuData();
                    _data.submenuId = iterator.submenuId;
                    this.resData.submenuLists.push(_data);
                }
            }
        }
    }
}
