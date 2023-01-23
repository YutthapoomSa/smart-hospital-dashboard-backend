import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { MenuDB } from 'src/database/entity/menu.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { CreateMenuDTO } from './create-menu.dto';

export class UpdateMenuDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    menuName: string;

    @ApiProperty()
    @IsString()
    menuIcon: string;

    @ApiProperty()
    @IsString()
    url: string;
}

export class UpdateMenuResDTOData {
    @ApiProperty()
    menuId: number;
    @ApiProperty()
    menuName: string;
    @ApiProperty()
    menuIcon: string;
    @ApiProperty()
    url: string;
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
            this.resData.menuId = datas.menuId;
            this.resData.menuName = datas.menuName;
            this.resData.menuIcon = datas.menuIcon;
            this.resData.url = datas.url;
        }
    }
}
