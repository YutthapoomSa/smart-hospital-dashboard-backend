import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuService } from './service/menu.service';
import { CreateMenuDTO, CreateMenuResDTO } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/helper/guard/user.decorator';
import { UserDB } from './../../database/entity/user.entity';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post('createMenu')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateMenuResDTO })
    create(@User() user: UserDB, @Body() body: CreateMenuDTO) {
        return this.menuService.create(body, user);
    }

    // @Get()
    // findAll() {
    //     return this.menuService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.menuService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    //     return this.menuService.update(+id, updateMenuDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.menuService.remove(+id);
    // }
}
