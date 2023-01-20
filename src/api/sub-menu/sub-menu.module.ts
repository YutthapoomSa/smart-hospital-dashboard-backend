import { Module } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { SubMenuController } from './sub-menu.controller';
import { SharedModule } from './../../shared/shared.module';

@Module({
    imports: [SharedModule],
    controllers: [SubMenuController],
    providers: [SubMenuService],
    exports: [SubMenuService],
})
export class SubMenuModule {}
