import {EmailAddress} from '@core/account'

describe('Email Address Unit Tests', () => {
    it('should create a valid email address', () => {
        // given
        const emailAddressString = 'john.doe@email.com'

        const emailAddress = new EmailAddress(emailAddressString)

        // then
        expect(emailAddress.getValue).toBeDefined()

        expect(emailAddress.getValue).toEqual(emailAddressString)
    })

    it('should throw an error when email address is invalid', () => {
        // given
        const invalidEmailAddress = 'invalid.email.com'

        // when
        const createInvalidEmailAddress = () =>
            new EmailAddress(invalidEmailAddress)

        // then
        expect(createInvalidEmailAddress).toThrow(
            'invalid.email.com is invalid email address'
        )
    })
})
