import { Module } from '@nestjs/common';
import { MenuService } from './service/menu.service';
import { MenuController } from './menu.controller';
import { SharedModule } from './../../shared/shared.module';
import { ApiMenuService } from './service/api-menu.service';

@Module({
    imports: [SharedModule],
    controllers: [MenuController],
    providers: [MenuService, ApiMenuService],
    exports: [MenuService],
})
export class MenuModule {}
