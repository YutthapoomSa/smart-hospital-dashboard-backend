import { Module } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { SubMenuController } from './sub-menu.controller';
import { SharedModule } from './../../shared/shared.module';
import { SubMenuRepository } from './sub-menu.repository';

@Module({
    imports: [SharedModule],
    controllers: [SubMenuController],
    providers: [SubMenuService, SubMenuRepository],
    exports: [SubMenuService, SubMenuRepository],
})
export class SubMenuModule {}
