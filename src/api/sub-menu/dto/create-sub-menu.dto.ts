import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { IsNumber } from 'class-validator';

export class CreateSubMenuReqDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    submenu_name: string;

    @ApiProperty()
    @IsString()
    submenu_icon: string;

    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    menu_id: number;
}
// ─────────────────────────────────────────────────────────────────────────────

export class MenuLists {
    @ApiProperty()
    menu_id: number;
    @ApiProperty()
    menu_name: string;
}
export class CreateSubmenuResDTOData {
    @ApiProperty()
    submenu_id: number;
    @ApiProperty()
    submenu_name: string;
    @ApiProperty()
    submenu_icon: string;
    @ApiProperty()
    url: string;
    @ApiProperty({ type: () => [MenuLists] })
    menuLists: MenuLists[];
}

export class CreateSubMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateSubmenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateSubmenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateSubmenuResDTOData();

        if (!!datas) {
            this.resData.submenu_id = datas.submenu_id;
            this.resData.submenu_name = datas.submenu_name;
            this.resData.submenu_icon = datas.submenu_icon;
            this.resData.url = datas.url;
            this.resData.menuLists = [];

            if (!!this.resData.menuLists && this.resData.menuLists.length > 0)
                for (const iterator2 of this.resData.menuLists) {
                    const _data2 = new MenuLists();
                    _data2.menu_id = iterator2.menu_id;
                    _data2.menu_name = iterator2.menu_name;
                    this.resData.menuLists.push(iterator2);
                }
        }
    }
}
