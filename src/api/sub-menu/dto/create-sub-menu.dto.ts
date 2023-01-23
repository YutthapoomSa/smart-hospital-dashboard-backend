import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SubMenuDB } from './../../../database/entity/sub-menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';
import { IsNumber } from 'class-validator';

export class CreateSubMenuReqDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    submenuName: string;

    @ApiProperty()
    @IsString()
    submenuIcon: string;

    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    menuId: number;
}
// ─────────────────────────────────────────────────────────────────────────────

export class MenuLists {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
}
export class CreateSubmenuResDTOData {
    @ApiProperty()
    submenuId: number;
    @ApiProperty()
    submenuName: string;
    @ApiProperty()
    submenuIcon: string;
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
            this.resData.submenuId = datas.submenuId;
            this.resData.submenuName = datas.submenuName;
            this.resData.submenuIcon = datas.submenuIcon;
            this.resData.url = datas.url;
            this.resData.menuLists = [];

            if (!!this.resData.menuLists && this.resData.menuLists.length > 0)
                for (const iterator2 of this.resData.menuLists) {
                    const _data2 = new MenuLists();
                    _data2.menuId = iterator2.menuId;
                    _data2.menuName = iterator2.menuName;
                    this.resData.menuLists.push(iterator2);
                }
        }
    }
}
