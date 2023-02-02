import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MenuDB } from './../../../database/entity/menu.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

export class UpdateMenuDTO {
    @ApiProperty()
    @IsString()
    menuName: string;

    @ApiProperty()
    @IsString()
    icon: string;

    @ApiProperty()
    @IsString()
    iframeMenu: string;


}

export class UpdateMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    icon: string;
    @ApiProperty()
    iframeMenu: string;
    @ApiProperty()
    submenuId: number[];
}

export class UpdateMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateMenuResDTOData();

        if (!!datas) {
            this.resData.menuId = datas.id;
            this.resData.menuName = datas.menuName;
            this.resData.icon = datas.icon;
            this.resData.iframeMenu = datas.iframeMenu;
            this.resData.submenuId = []

        }
    }
}
