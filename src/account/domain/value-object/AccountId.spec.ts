import {AccountId, InvalidAccountIdError} from './AccountId'

describe('Account Id Unit Tests', () => {
    it('should be able to create a valid account id', () => {
        // given
        const validValue = '123e4567-e89b-12d3-a456-426614174000'

        // when
        const accountId = new AccountId(validValue)

        // then
        expect(accountId.getValue).toBe(validValue)
    })

    it('should throw an error when trying to create an account id with an empty value', () => {
        // given
        const invalidValue = ''

        // when
        const createAccountId = () => new AccountId(invalidValue)

        // then
        expect(createAccountId).toThrow(InvalidAccountIdError)
    })

    it('should throw an error when trying to create an account id with an invalid value', () => {
        // given
        const invalidValue = 'invalid-value'

        // when
        const createAccountId = () => new AccountId(invalidValue)

        // then
        expect(createAccountId).toThrow(InvalidAccountIdError)
    })

    it('should be able to compare with another account id', () => {
        // given
        const validValue = '123e4567-e89b-12d3-a456-426614174000'
        const accountId = new AccountId(validValue)
        const anotherAccountId = new AccountId(validValue)

        // when
        const areEqual = accountId.equals(anotherAccountId)

        // then
        expect(areEqual).toBe(true)
    })

    it('should be able to compare with another account id and return false', () => {
        // given
        const validValue = '123e4567-e89b-12d3-a456-426614174000'
        const accountId = new AccountId(validValue)
        const anotherAccountId = new AccountId(
            '123e4567-e89b-12d3-a456-426614174111'
        )

        // when
        const areEqual = accountId.equals(anotherAccountId)

        // then
        expect(areEqual).toBe(false)
    })
})
