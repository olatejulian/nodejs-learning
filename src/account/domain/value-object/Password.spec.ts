import {InvalidPasswordError, Password} from './Password'

describe('Password Unit Tests', () => {
    it('should be able to create a valid password', () => {
        // given
        const password = new Password('Password@123')

        // then
        expect(password.getValue).toBeDefined()
    })

    it('should throw an error when password is null', () => {
        // given
        const invalidPassword = null

        // when
        const createInvalidPassword = () => new Password(invalidPassword)

        // then
        expect(createInvalidPassword).toThrowError(InvalidPasswordError)
    })

    it('should throw an error when password is undefined', () => {
        // given
        const invalidPassword = undefined

        // when
        const createInvalidPassword = () => new Password(invalidPassword)

        // then
        expect(createInvalidPassword).toThrowError(InvalidPasswordError)
    })

    it('should be able to throw an error when password is lower than 8 characters', () => {
        // given
        const invalidPassword = '1234567'

        // when
        const createInvalidPassword = () => new Password(invalidPassword)

        // then
        expect(createInvalidPassword).toThrowError(InvalidPasswordError)
    })

    it('should be able to hash a string', async () => {
        // given
        const value = 'Password@123'
        const password = new Password(value)

        // when
        await password.hash()

        // then
        expect(password.getValue == value).toBe(false)
    })

    it('should be able to compare a hashed password with a plain text password', async () => {
        // given
        const value = 'Password@123'
        const password = new Password(value)

        // when
        await password.hash()

        // then
        expect(await password.compare(value)).toBe(true)
    })
})
