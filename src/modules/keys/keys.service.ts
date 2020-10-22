import { Key } from './keys.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, ObjectID } from 'mongoose';

@Injectable()
export class KeysService {

  constructor(@InjectModel('Key') private readonly keyModel: Model<Key>) {
  }

  /**
   * createKey
   */
  public async createKey(body) {
    const key = new this.keyModel(body);
    return await key.save();
  }

  /**
   * updateKey
   */
  public async updateKey(conditions, updates) {
    const key = await this.keyModel.updateOne(conditions, updates);
    return key;
  }


  /**
   * findKeys
   */
  public findKeys(options, { limit, skip, sort }) {
    return this.keyModel.find(options).limit(+limit).skip(+skip).sort(sort);
  }

  public findKey(options) {
    return this.keyModel.findOne(options);
  }

  public findById(id) {
    return this.keyModel.findById(id);
  }

  public deleteKey(options) {
    return this.keyModel.deleteOne(options);
  }
}
