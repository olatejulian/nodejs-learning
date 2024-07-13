import {EmailAddress} from './EmailAddress'

describe('Email Address Unit Tests', () => {
    it('should create a valid email address', () => {
        // given
        const emailAddress = new EmailAddress('john.doe@email.com')

        // then
        expect(emailAddress.getValue).toBeDefined()
    })

    it('should throw an error when email address is invalid', () => {
        // given
        const invalidEmailAddress = 'invalid.email.com'

        // when
        const createInvalidEmailAddress = () =>
            new EmailAddress(invalidEmailAddress)

        // then
        expect(createInvalidEmailAddress).toThrowError(
            'invalid.email.com is invalid email address'
        )
    })
})
