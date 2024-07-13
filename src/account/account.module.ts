import {CACHE_MANAGER} from '@nestjs/cache-manager'
import {Module} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtModule, JwtService} from '@nestjs/jwt'
import {Cache} from 'cache-manager'
import {AccountController} from './application/account.controller'
import {AccountService} from './application/account.service'
import {AccountRepository} from './domain'
import {InMemoryAccountRepository} from './infra/repository'

@Module({
    imports: [JwtModule.register({})],
    controllers: [AccountController],
    providers: [
        {
            provide: AccountService,
            useFactory: (
                repository: AccountRepository,
                jwtService: JwtService,
                configService: ConfigService,
                cacheService: Cache
            ) =>
                new AccountService(
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
