import {createParamDecorator} from '@nestjs/common';
export const WhoIAm=createParamDecorator((data,req) => {
	let user=req.user;
	let obj = {}
	if(user){obj={
		username: user.username,
		email: user.email,
		isActive: user.isActive,
		admin: user.admin
	}}
	return obj;
})