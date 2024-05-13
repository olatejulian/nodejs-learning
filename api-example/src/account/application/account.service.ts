import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { createHmac } from 'crypto';
import {
  Account,
  AccountName,
  AccountRepository,
  EmailAddress,
  Password,
} from '../domain';
import { AuthenticateAccountDto, AuthTokensDto, CreateAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly repository: AccountRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cacheService: Cache,
  ) {}

  public async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<void> {
    const name = new AccountName(createAccountDto.name);

    const emailAddress = new EmailAddress(createAccountDto.email);

    const password = new Password(createAccountDto.password);

    await password.hash();

    const account = Account.create({
      name,
      emailAddress,
      password,
    });

    await this.repository.save(account);
  }

  public async authenticateAccount(
    authenticateAccountDto: AuthenticateAccountDto,
  ): Promise<AuthTokensDto> {
    const { username, password } = authenticateAccountDto;

    const emailAddress = new EmailAddress(username);

    const account = await this.repository.getByEmailAddress(emailAddress);

    const isPasswordValid = await account?.comparePassword(password);

    if (!isPasswordValid) {
      return null;
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: account.getEmailAddress.getValue,
      },
      {
        audience: 'urn:jwt:type:access',
        issuer: 'urn:system:token-issuer:type:access',
        expiresIn:
          this.configService.get<string>('AUTH_ACCESS_TOKEN_DURATION_MINUTES') +
          'm',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: account.getEmailAddress.getValue,
      },
      {
        audience: 'urn:jwt:type:refresh',
        issuer: 'urn:system:token-issuer:type:refresh',
        expiresIn:
          this.configService.get<string>(
            'AUTH_REFRESH_TOKEN_DURATION_MINUTES',
          ) + 'm',
      },
    );

    const refreshTokenHashed = createHmac(
      'sha256',
      this.configService.get<string>('AUTH_REFRESH_TOKEN_SECRET'),
    )
      .update(refreshToken)
      .digest('hex');

    await this.cacheService.set(
      refreshTokenHashed,
      account.getEmailAddress.getValue,
      1000 *
        60 *
        this.configService.get<number>(
          'AUTH_REFRESH_TOKEN_CACHE_DURATION_MINUTES',
        ),
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
