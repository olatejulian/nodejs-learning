import {ApiProperty} from '@nestjs/swagger'

export class CreateAccount201Response {
    @ApiProperty({example: 201}) status: number
    @ApiProperty({example: {}}) data: object
}

export class CreateAccount422Response {
    @ApiProperty({example: 422}) status: number
    @ApiProperty({example: 'Some field validation error'}) message: string
}

export class CreateAccount400Response {
    @ApiProperty({example: 400}) status: number
    @ApiProperty({example: 'Oh, no! Something went wrong'}) message: string
}
