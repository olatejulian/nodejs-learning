import {HttpStatus, Injectable, NestMiddleware} from '@nestjs/common'
import {NextFunction, Request, Response} from 'express'

@Injectable()
export class WithRefreshTokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        const token = req.cookies['refresh-token']

        if (token) {
            try {
                // TODO: Implement refresh token validation
            } catch {}
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized')
        }

        next()
    }
}
