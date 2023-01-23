import { FindOneUserResDTO } from './dto/find-one-user-res.dto';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDB } from './../../database/entity/user.entity';
import { User } from './../../helper/guard/user.decorator';
import { CreateUserReqDTO } from './dto/create-user-req.dto';
import { ApiUsersService } from './services/api-users.service';
import { UserLoginRequestDTO } from './dto/user-login.dto';
import { UserLoginRefreshToKenReqDto } from './dto/user-login-refreshToken.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly apiUsersService: ApiUsersService) { }

    // Register with guest
    @Post('register')
    @ApiOperation({ summary: 'สร้างuserสำหรับ Admin' })
    @ApiOkResponse({ type: FindOneUserResDTO })
    register(@Body() body: CreateUserReqDTO) {

        return this.apiUsersService.api_create(body);
    }

    @Post('registerWithAdmin')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Adminเป็นคนสร้างให้User' })
    @ApiOkResponse({ type: FindOneUserResDTO })
    async registerWithAdmin(@Body() body: CreateUserReqDTO, @User() user: UserDB) {

        return this.apiUsersService.api_createWithAdmin(body, user);
    }

    @Post('login')
    login(@Body() body: UserLoginRequestDTO) {
        return this.apiUsersService.api_login(body);
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: FindOneUserResDTO })
    find(@Param('id') id: number): Promise<FindOneUserResDTO> {
        return this.apiUsersService.api_findOne(id);
    }

    @Post('refreshToken')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    refreshToken(@User() user: UserDB, @Body() body: UserLoginRefreshToKenReqDto) {
        return this.apiUsersService.api_refreshToken(user, body);
    }

    @Patch('updateUserById')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    updateUserById(@User() user: UserDB, @Body() body: UpdateUserDto) {
        return this.apiUsersService.api_updateUserById(user, body);
    }
}
