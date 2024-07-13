import {ApiProperty} from '@nestjs/swagger'

export class SignUp201Response {
    @ApiProperty({example: 201}) status: number
    @ApiProperty({example: {}}) data: object
}

export class SignUP422Response {
    @ApiProperty({example: 422}) status: number
    @ApiProperty({example: 'Some field validation error'}) message: string
}

export class SignUp400Response {
    @ApiProperty({example: 400}) status: number
    @ApiProperty({example: 'Oh, no! Something went wrong'}) message: string
}
