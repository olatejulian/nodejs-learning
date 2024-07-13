import {CacheModule} from '@nestjs/cache-manager'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {AccountModule} from './account/account.module'

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: () => ({
                ttl: 10,
                max: 1000,
            }),
        }),
        AccountModule,
    ],
})
export class AppModule {}
