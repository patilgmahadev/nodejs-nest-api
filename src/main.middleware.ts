import { HttpException, HttpStatus, Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import {AuthService} from 'modules/auth/auth.service';



@Injectable()
export class MainMiddleware implements NestMiddleware {

  constructor(private auth: AuthService) {
  }

  resolve(...args: any[]): MiddlewareFunction {
		return async (req,res,next) => {
			if (!req.headers.authorization) throw new HttpException('headers invalid',HttpStatus.FORBIDDEN);;
			req = await this.auth.validateToken(req);
      next();
    };
  }
}
