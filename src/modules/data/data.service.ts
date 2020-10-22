import { Model, ObjectID } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Data } from './data.interface';

@Injectable()
export class DataService {
  constructor(
    @InjectModel('Data') private readonly dataModel: Model<Data>
  ) {
  }

  public async createData(data : Data) {
    return await new this.dataModel(data).save();
  }

  public async updateData(conditions, updates) {
    return await this.dataModel.updateOne(conditions, updates);
  }

  public findData(options) {
    return this.dataModel.find(options);
  }

  public findOneData(options) {
    return this.dataModel.findOne(options);
  }

  public findById(id: any) {
    return this.dataModel.findById(id);
  }

  public deleteData(options) {
    return this.dataModel.deleteOne(options);
  }
}
