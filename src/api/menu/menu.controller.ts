import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDB } from './../../database/entity/user.entity';
import { User } from './../../helper/guard/user.decorator';
import { CreateMenuDTO, CreateMenuResDTO } from './dto/create-menu.dto';
import { UpdateMenuDTO, UpdateMenuResDTO } from './dto/update-menu.dto';
import { ApiMenuService } from './service/api-menu.service';
import { MenuService } from './service/menu.service';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService, private readonly apiMenuService: ApiMenuService) {}

    @Post('createMenu')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateMenuResDTO })
    @ApiOperation({ summary: 'สร้างรายการเมนู' })
    async create(@User() user: UserDB, @Body() body: CreateMenuDTO) {
        return await this.apiMenuService.api_create(body, user);
    }

    @Patch('updateMenu/:menu_id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UpdateMenuResDTO })
    @ApiOperation({ summary: 'อัพเดตรายการเมนู' })
    async update(@Param('menu_id') menu_id: number, @Body() updateMenuDto: UpdateMenuDTO, @User() user: UserDB) {
        return await this.apiMenuService.api_update(menu_id, updateMenuDto, user);
    }

    @Get('findOne/:menu_id')
    @ApiOperation({ summary: 'ค้นหารายการเมนูโดย id' })
    async findOne(@Param('menu_id') menu_id: number) {
        return await this.apiMenuService.api_findOne(menu_id);
    }

    @Get('Menu/findAllMenu')
    @ApiOperation({ summary: 'findAll menu' })
    async findAll() {
        return await this.apiMenuService.api_findAll();
    }

    @Delete('DeleteMenuByMenuId/:menu_id')
    @ApiOperation({ summary: 'delete menu' })
    async remove(@Param('menu_id') menu_id: number) {
        return await this.apiMenuService.api_remove(menu_id);
    }
}
