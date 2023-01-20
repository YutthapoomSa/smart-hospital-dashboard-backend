import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiMenuService } from './api/menu/service/api-menu.service';
import { UsersModule } from './api/users/users.module';
import { ConvertImageService } from './helper/services/convert-image.service';
import { EncryptionService } from './helper/services/encryption.service';
import { LogService } from './helper/services/log.service';
import { PaginationService } from './helper/services/pagination/pagination.service';
import { SharedModule } from './shared/shared.module';
import { MenuModule } from './api/menu/menu.module';
import { SubMenuModule } from './api/sub-menu/sub-menu.module';
@Module({
    imports: [
        CacheModule.register(),
        UsersModule,
        SharedModule,
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 60,
        }),
        MenuModule,
        SubMenuModule,
    ],
    providers: [ApiMenuService,LogService, ConvertImageService, EncryptionService, PaginationService],
})
export class AppModule {}
