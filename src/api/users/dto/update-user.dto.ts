import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserDBGender, UserDBRole } from './../../../database/entity/user.entity';

export class UpdateUserDto {

    @ApiProperty()
    @IsNumber()
    userId?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    phoneNumber: string;

    @ApiProperty({
        enum: Object.keys(UserDBRole).map((k) => UserDBRole[k]),
    })
    @IsEnum(UserDBRole)
    role?: UserDBRole;
}
