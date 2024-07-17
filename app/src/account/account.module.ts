import {CACHE_MANAGER} from '@nestjs/cache-manager'
import {Module} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtModule, JwtService} from '@nestjs/jwt'
import {
    AccountFactory,
    AccountRepository,
    InMemoryAccountRepository,
} from '@ts-api-example/core'
import {Cache} from 'cache-manager'
import {AccountController} from './account.controller'
import {AccountService} from './account.service'

@Module({
    imports: [JwtModule.register({})],
    controllers: [AccountController],
    providers: [
        {
            provide: AccountService,
            useFactory: (
                factory: AccountFactory,
                repository: AccountRepository,
                jwtService: JwtService,
                configService: ConfigService,
                cacheService: Cache
            ) =>
                new AccountService(
                    factory,
                    repository,
                    jwtService,
                    configService,
                    cacheService
                ),
            inject: [
                InMemoryAccountRepository,
                JwtService,
                ConfigService,
                CACHE_MANAGER,
            ],
        },
        InMemoryAccountRepository,
    ],
})
export class AccountModule {}
