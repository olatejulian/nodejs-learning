import {WithRefreshTokenMiddleware} from './with-refresh-token.middleware'

describe('WithRefreshTokenMiddleware', () => {
    it('should be defined', () => {
        expect(new WithRefreshTokenMiddleware()).toBeDefined()
    })
})
