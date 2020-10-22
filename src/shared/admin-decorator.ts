import { createParamDecorator } from '@nestjs/common';
export const Admin=createParamDecorator((data,req) => {
	const user=req.user;
	const key=data;
	const query = user.admin? {_id: req.params[key]}:{user,_id: req.params[key]};
  return query;
})