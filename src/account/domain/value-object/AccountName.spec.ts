import {AccountName, InvalidAccountNameError} from './AccountName'

describe('AccountName Unit Tests', () => {
    it('should be able to create a valid account name', () => {
        // given
        const validValue = 'John Doe'

        // when
        const accountName = new AccountName(validValue)

        // then
        expect(accountName.getValue).toBe(validValue)
    })

    it('should throw an error when trying to create an account name with an empty value', () => {
        // given
        const invalidValue = ''

        // when
        const createAccountName = () => new AccountName(invalidValue)

        // then
        expect(createAccountName).toThrow(InvalidAccountNameError)
    })

    it('should throw an error when trying to create an account name with a null value', () => {
        // given
        const invalidValue = null

        // when
        const createAccountName = () => new AccountName(invalidValue)

        // then
        expect(createAccountName).toThrow(InvalidAccountNameError)
    })

    it('should throw an error when trying to create an account name with a value that is too long', () => {
        // given
        const invalidValue = 'a'.repeat(51)

        // when
        const createAccountName = () => new AccountName(invalidValue)

        // then
        expect(createAccountName).toThrow(InvalidAccountNameError)
    })
})
