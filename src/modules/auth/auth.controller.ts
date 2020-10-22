import {User} from '../users/users.interface';
import {InjectModel} from '@nestjs/mongoose';
import {UserModel} from '../users/users.schema';
import {ApiBearerAuth,ApiResponse} from '@nestjs/swagger';
import {Controller,Post,Body,Query,HttpStatus,HttpException, Get} from '@nestjs/common';
import {loginBody,registerBody,forgotBody,resetBody,resetParam} from './auth';
import {AuthService} from './auth.service';
import {EmailService} from 'email/email.service';
import {Model} from 'mongoose';
import {UsersService} from 'modules/users/users.service';
import {async} from 'rxjs/internal/scheduler/async';

let bcrypt=require('bcrypt-promise');

@Controller('auth')
export class AuthController {

	constructor(private auth: AuthService,private email: EmailService,private us: UsersService) {
	}

	
	@Post('login')
	@ApiResponse({
		status: 200,description: `{
            token: "string"
        }`,
	})
	async login(@Body() body: loginBody) {
		const user=await this.us.findOneByUsername(body.username);
		if (!user) throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
		if(!user.isActive) throw new HttpException('Your account is disabled',HttpStatus.BAD_REQUEST);
		let match=await bcrypt.compare(body.password,user.password);
		if (!match) throw new HttpException('Username and password mismatch',HttpStatus.BAD_REQUEST);
		const {token,refreshToken}=await this.auth.signIn(user.username);
		return {token,refreshToken,username: user.username,
			email: user.email,
			isActive: user.isActive,
			admin: user.admin};
	}


	@Post('register')
	@ApiResponse({
		status: 200,description: `User Created`,
	})
	async register(@Body() body: registerBody) {
		
		const currentUser=await this.us.findUser({ $or: [ { username: body.username }, { email: body.email } ] });
		if (currentUser) {
			throw new HttpException('Username or email already exitist',HttpStatus.BAD_REQUEST);
		} else {
			let {username,email,password,admin,isActive}=body;
			try {
				await this.us.createUser({username,email,password,admin,isActive});
				return {status:'User Created'};
			} catch (error) {
				throw new HttpException("Username or email already exitist",HttpStatus.BAD_REQUEST)
			}
		}
	}

	@Post('reset')
	@ApiResponse({
		status: 200,description: `Password Reset`,
	})
	async reset(@Query() query: resetParam,@Body() body: resetBody) {
		const user=await this.us.findUser({email: query.email});
		if (!user) throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
		const userId=query.token;
		let match=await bcrypt.compare(user.id,userId);
		if (!match) throw new HttpException('Invalid link',HttpStatus.BAD_REQUEST);
		user.password=await bcrypt.hash(body.password,10);
		await user.save();
		return {messages:'Password Reset'};
	}

	@Post('forgot')
	@ApiResponse({
		status: 200,description: `Email with your new password is on its way`,
	})
	async forgot(@Body() body: forgotBody) {
		const user=await this.us.findUser({username: body.username});
		if (!user) return 'User not found';
		const userId=user.id;
		let hash=await bcrypt.hash(userId,10);
		const emailObject={
			to: user.email,
			subject: 'Password Reset',
			text: `Here is your password reset link: http://localhost:4200/auth/reset?email=${user.email}&token=${hash}`,
		};

		this.email.sendEmail(emailObject);
		return {message:'Email with your new password is on its way'};
	}
	@Post("refresh_token")
	@ApiResponse({status: 200,description: `new token`,})
	async validateRefreshToken(@Body() body:any) {
		return this.auth.validateRefreshToken(body.token);
	}
}
