import { UserModel } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './users.interface';
import { Model } from 'mongoose';

let bcrypt = require('bcrypt-promise');

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }

  /**
   * findOneByUsername
   */
  public findOneByUsername(username) {
    return this.userModel.findOne({ username });
  }


  /**
   * createUser
   */
  public async createUser(body) {
		const user=new this.userModel(body);
		let hash = await bcrypt.hash(body.password, 10);
		user.password=hash;
    return await user.save();
  }


  /**
   * createUser
   */
  public async updateUser(conditions, updates) {
    if (updates.password) {
      let hash = await bcrypt.hash(updates.password, 10);
      updates.password = hash;
    }
    const user = await this.userModel.updateOne(conditions, updates);
    return user;
  }


  /**
   * findUser
   */
  public findUsers(options, { limit, skip, sort }) {
    return this.userModel.find(options).limit(+limit).skip(+skip).sort(sort);
  }

	public findUser(options) {
		return this.userModel.findOne(options);
  }

  public findById(id) {
    return this.userModel.findById(id);
  }

  public deleteUser(options) {
    return this.userModel.deleteOne(options);
  }

}
