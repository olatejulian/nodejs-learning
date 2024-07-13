import {CACHE_MANAGER, CacheModule} from '@nestjs/cache-manager'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {JwtModule, JwtService} from '@nestjs/jwt'
import {Test, TestingModule} from '@nestjs/testing'
import {Cache} from 'cache-manager'
import {AccountRepository} from '../domain'
import {InMemoryAccountRepository} from '../infra/repository'
import {AccountController} from './account.controller'
import {AccountService} from './account.service'

describe('AccountController', () => {
    let controller: AccountController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                JwtModule.register({}),
                CacheModule.register(),
            ],
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
        }).compile()

        controller = module.get<AccountController>(AccountController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should be able to do an account sign up', async () => {
        const requestBody = {
            name: 'John Doe',
            email: 'john.doe@email.com',
            password: 'JohnDoe123!@#',
        }

        await controller.signUp(requestBody)
    })

    it('should be return an http exception when try to create an account with invalid name', async () => {
        const requestBody = {
            name: '',
            email: 'john.doe@email.com',
            password: 'JohnDoe123!@#',
        }

        await controller.signUp(requestBody).catch(error => {
            expect(error.status).toBe(422)
            expect(error.message).toBe(
                'Account name must have at least 3 characters'
            )
        })
    })
})
