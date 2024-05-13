import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @ApiProperty({ example: 'JohnDoe123!@#' })
  password: string;
}
