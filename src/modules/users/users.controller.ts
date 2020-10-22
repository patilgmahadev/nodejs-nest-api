import { UserGuard } from './users.guard';
import { registerBody, deleteUserParam, getOneUserParam, editUserBody, editUserParam } from './users';
import { Controller, Get, Post, Req, Res, Body, Put, Delete, Param, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { QueryParams } from '../../api';
import {WhoIAm} from '../../shared/who_iam.decorator';

const ObjectId = require('mongodb').ObjectId;

@ApiBearerAuth()
@Controller('users')
export class UsersController {

  constructor(private us: UsersService) {
  }
	@Get("whoiam")
	@ApiResponse({status: 200,description: 'find me'})
	async whoIAm(@WhoIAm() whoIAm) {
		return whoIAm
	}
  @Get()
  @ApiResponse({
    status: 200, description: `[{
        "_id": id,
        "username": "string",
        "email": "string",
        "type": "string",
        "password": "string"
    }]`,
	})
	@UseGuards(UserGuard)
  async findAll(@Query() qparams: QueryParams) {
    let search = Object.assign({}, qparams);
    delete search.skip;
    delete search.limit;
    delete search.sort;
		let allUsers=await this.us.findUsers(search,qparams);
		allUsers=allUsers.map(user=>{
			user.password="";
			return user;
		})
    return allUsers;
  }

  @Post()
  @ApiResponse({
    status: 200, description: `User Created`,
	})
	@UseGuards(UserGuard)
  async createUser(@Body() body: registerBody) {
		let {username,email,password,admin,isActive}=body;
		isActive=isActive? isActive:false;
		admin=admin? admin:false;
    await this.us.createUser({ username, email, password, admin,isActive });
    return 'User Created';
  }

  @Delete(':user_id')
  @ApiResponse({
    status: 200, description: `Deleted User`,
	})
	@UseGuards(UserGuard)
  async deleteUser(@Param() params: deleteUserParam) {
    let id = params.user_id;
    let r = await this.us.deleteUser({ _id: ObjectId(id) });
    return 'Deleted User';
  }

  @Get(':user_id')
  @ApiResponse({
    status: 200, description: `{
        "_id": id,
        "username": "string",
        "email": "string",
        "type": "string",
    }`,
	})
	@UseGuards(UserGuard)
  async getOneUser(@Param() params: getOneUserParam) {
    let id = params.user_id;
    let userFound = await this.us.findById(ObjectId(id));
    delete userFound.password;
    return userFound;
  }


  @Put(':user_id')
  @ApiResponse({
    status: 200, description: `{
        "_id": id,
        "username": "string",
        "email": "string",
        "type": "string",
    }`,
	})
	@UseGuards(UserGuard)
	async editUser(@Body() body: registerBody,@Param() params: editUserParam) {
		const currentUser=await this.us.findUser({$or: [{username: body.username},{email: body.email}]});
		if (currentUser._id != params.user_id) {
			throw new HttpException('Username or email already exitist',HttpStatus.BAD_REQUEST);
		}
    const conditions = { _id: params.user_id };
    await this.us.updateUser(conditions, body);
    return {status:"UserUpdated"};
	}
	
	
}
