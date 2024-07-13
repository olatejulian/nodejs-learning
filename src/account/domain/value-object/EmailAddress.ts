import {ValueObject} from 'src/shared'
import validator from 'validator'

export class InvalidEmailAddressError extends Error {
    constructor(message?: string) {
        super(message)

        this.name = 'InvalidEmailAddressError'
    }
}

export class EmailAddress extends ValueObject<string> {
    private static readonly EMAIL_IS_INVALID = (email: string) =>
        `${email} is invalid email address`

    constructor(value: string) {
        EmailAddress.validate(value)

        super(value)
    }

    private static validate(value: string): void {
        if (!validator.isEmail(value)) {
            throw new InvalidEmailAddressError(this.EMAIL_IS_INVALID(value))
        }
    }
}
