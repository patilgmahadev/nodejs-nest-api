import { EmailModule } from '../../email/email.module';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import {APP_FILTER} from '@nestjs/core';
import {HttpErrorFilter} from 'shared/http-error.filter';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UsersModule,
    EmailModule,
  ],
  controllers: [AuthController],
	providers: [AuthService,{
		provide: APP_FILTER,
		useClass: HttpErrorFilter,
	}],
	exports:[AuthService]
})
export class AuthModule {
}
