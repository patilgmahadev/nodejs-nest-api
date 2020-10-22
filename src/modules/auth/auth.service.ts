import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
const jwt=require('jsonwebtoken');

@Injectable()
export class AuthService {
	public tokenList  = {}
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }
	async getToken(username,expiresIn) {
		const user: JwtPayload={username};
		return await this.jwtService.sign(user, {expiresIn:parseInt(expiresIn)});
	}
  async signIn(username) {
    const token = await this.getToken(username,process.env.tokenLife)
		const refreshToken= await this.getToken(username,process.env.refreshTokenLife)
		this.tokenList[refreshToken]=refreshToken;
		return {token,refreshToken};
  }
	async validateRefreshToken(token) {
		if (this.tokenList[token]) {
			try {
				const payload=await jwt.verify(token,process.env.SECRET);
				const newtoken=await this.getToken(payload.username,process.env.tokenLife);
				return await {token:newtoken}
			} catch (error) {
				if (error.name==='TokenExpiredError') {
					delete this.tokenList[token]
          throw new HttpException('RefeshToken Expire', HttpStatus.UNAUTHORIZED);
        }
			}
			
		} else {
			throw new HttpException('RefeshToken Expire', HttpStatus.UNAUTHORIZED);
		}
	}
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByUsername(payload.username);
	}
	async validateToken(req) {
		let match;
      try {
				match=jwt.verify(req.headers.authorization,process.env.SECRET);
      } catch (e) {
				if (e.name === 'TokenExpiredError') {
          throw new HttpException('Token Expire', HttpStatus.UNAUTHORIZED);
        } else if (e.name === 'JsonWebTokenError') {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
			}
			if (match) req.user=await this.usersService.findUser({username: match.username});
			if (!req.user) throw new HttpException('Invalid token',HttpStatus.FORBIDDEN);
		return req;
	}
}
