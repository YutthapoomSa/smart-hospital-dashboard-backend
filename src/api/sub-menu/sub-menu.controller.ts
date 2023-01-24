import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDB } from './../../database/entity/user.entity';
import { User } from './../../helper/guard/user.decorator';
import { CreateSubMenuReqDTO, CreateSubMenuResDTO } from './dto/create-sub-menu.dto';
import { FindAllSubMenuResDTO } from './dto/findAll-SubMenu.dto';
import { FindOneMenuResDTO } from './dto/findOne-subMenu.dto';
import { UpdateSubMenuDTO, UpdateSubMenuResDTO } from './dto/update-sub-menu.dto';
import { SubMenuService } from './sub-menu.service';

@Controller('sub-menu')
@ApiTags('SubMenu')
export class SubMenuController {
    constructor(private readonly subMenuService: SubMenuService) {}

    @Post('CreateSubMenu')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateSubMenuResDTO })
    async create(@Body() body: CreateSubMenuReqDTO, @User() user: UserDB) {
        return await this.subMenuService.create(body, user);
    }

    @Get('SubMenu/FindAllSubMenus')
    @ApiOperation({ summary: 'findAll sub-menu' })
    @ApiOkResponse({ type: FindAllSubMenuResDTO })
    async findAll() {
        return await this.subMenuService.findAll();
    }

    @Get('findOne/:submenuId')
    @ApiOperation({ summary: 'findOne sub-menu' })
    @ApiOkResponse({ type: FindOneMenuResDTO })
    async findOne(@Param('submenu_id') submenuId: number) {
        return await this.subMenuService.findOne(submenuId);
    }

    @Patch('updateSubMenu/:submenuId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UpdateSubMenuResDTO })
    @ApiOperation({ summary: 'Update Sub Menu' })
    async update(@Body() body: UpdateSubMenuDTO, @User() user: UserDB) {
        return await this.subMenuService.update(body, user);
    }

    @Delete('deleteSubMenuBySubMenuId/:submenuId')
    @ApiOperation({ summary: 'delete submenu' })
    async remove(@Param('submenu_id') submenuId: number) {
        return await this.subMenuService.remove(submenuId);
    }
}
