import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {ApiBody, ApiResponse, ApiTags} from '@nestjs/swagger'
import {
    InvalidAccountNameError,
    InvalidEmailAddressError,
    InvalidPasswordError,
} from '@ts-api-example/core'
import date from 'date-fns'
import express from 'express'
import {
    CreateAccount201Response,
    CreateAccount400Response,
    CreateAccount422Response,
} from './account.response'
import {AccountService} from './account.service'
import {AuthenticateAccountDto, CreateAccountDto} from './dto'

@ApiTags('Account')
@Controller('account')
export class AccountController {
    constructor(
        private readonly service: AccountService,
        private readonly configService: ConfigService
    ) {}

    @Post('create-account')
    @ApiTags('Public Routes')
    @ApiBody({type: CreateAccountDto})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Account created successfully',
        type: CreateAccount201Response,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Oh, no! Something went wrong',
        type: CreateAccount400Response,
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        description: 'Schema validation failed',
        type: CreateAccount422Response,
    })
    public async createAccount(@Body() requestBody: CreateAccountDto) {
        try {
            await this.service.createAccount(requestBody)

            return {
                status: 201,
                data: {},
            }
        } catch (error: any) {
            if (
                error instanceof InvalidAccountNameError ||
                error instanceof InvalidEmailAddressError ||
                error instanceof InvalidPasswordError
            ) {
                throw new HttpException(
                    error.message,
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    {
                        cause: error,
                        description: 'Unprocessable Entity',
                    }
                )
            } else {
                throw new HttpException(
                    'Oh, no! Something went wrong',
                    HttpStatus.BAD_REQUEST,
                    {
                        cause: error,
                        description: 'Houston, we have a problem',
                    }
                )
            }
        }
    }

    @Post('login')
    public async logIn(
        @Body() requestBody: AuthenticateAccountDto,
        @Res() response: express.Response
    ) {
        const tokens = await this.service.authenticateAccount(requestBody)

        if (!tokens) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.UNAUTHORIZED,
                {
                    description: 'Unauthorized',
                }
            )
        }

        this.setRefreshTokenCookie(response, tokens.refreshToken)

        return {
            status: 200,
            data: tokens.accessToken,
        }
    }

    private setRefreshTokenCookie(
        response: express.Response,
        refreshToken: string
    ): void {
        response.cookie('refresh-token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: date.add(new Date(), {
                minutes: this.configService.get<number>(
                    'AUTH_REFRESH_TOKEN_DURATION_MINUTES'
                ),
            }),
        })
    }
}
