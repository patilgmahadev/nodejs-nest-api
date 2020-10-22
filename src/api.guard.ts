import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { KeysService } from 'modules/keys/keys.service';
import {AuthService} from 'modules/auth/auth.service';


@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private auth:AuthService,private ks: KeysService) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    let request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
			request=await this.auth.validateToken(request);
      if (request.user && request.user.admin) {
        return true;
      }
    }
		const key = await this.ks.findKey({ key: request.headers.api_key });
    if (!key || !key.active) {
      throw new HttpException('Invalid API key', HttpStatus.UNAUTHORIZED);
      return false;
    }
    return true;
  }
}
