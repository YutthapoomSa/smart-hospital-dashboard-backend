import { ApiProperty } from '@nestjs/swagger';
import { UserDB, UserDBGender, UserDBRole } from '../../../database/entity/user.entity';
import { ResStatus } from './../../../shared/enum/res-status.enum';

class FindOneUserResDTOResData {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty({
        description: 'ข้อมูล',
    })
    userName: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty({
        description: 'สิทธิ์การเข้าใช้งาน',
    })
    role: UserDBRole;

    @ApiProperty({
        description: 'status เปิด ปิด',
    })
    status: boolean;

    @ApiProperty({
        description: 'เพศ',
    })
    gender: UserDBGender;

    @ApiProperty()
    phoneNumber: string;
}

export class FindOneUserResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindOneUserResDTOResData,
        description: 'ข้อมูล',
    })
    resData: FindOneUserResDTOResData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: UserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindOneUserResDTOResData();
        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.email = datas.email;
            this.resData.userName = datas.username;
            this.resData.firstName = datas.firstName;
            this.resData.lastName = datas.lastName;
            this.resData.role = datas.role;
            this.resData.status = datas.status;
            this.resData.gender = datas.gender;
            this.resData.phoneNumber = datas.phoneNumber;
        }
    }
}
