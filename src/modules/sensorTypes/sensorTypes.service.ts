import { Model, ObjectID } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { SensorType } from './sensorTypes.interface';
import * as fs from 'fs';
@Injectable()
export class SensorTypesService {
  constructor(
    @InjectModel('SensorType') private readonly sensorTypeModel: Model<SensorType>,
    private httpService: HttpService,
  ) {
    //const file = 
    const x: SensorType[] = require('../../resources/data/sensorTypes.json');//JSON.parse(fs.readFileSync(file, 'utf8'));

    x.forEach(sensorType => {
      console.log(sensorType);
      this.sensorTypeModel.findOne(sensorType)
        .exec((err, user) => {
          console.log('user', user);
          console.log('err', err);

          if (!user) {
            this.createSensorType(sensorType).then(data => {
              console.log('data2', data);
            }).catch(err => {
              console.log('err2', err);
            });
          }
        });
    });
  }

  /**
   * createSensorType
   */
  public async createSensorType(sensorType: SensorType) {
    return await new this.sensorTypeModel(sensorType).save();
  }

  /**
   * updateSensorType
   */
  public async updateSensorType(conditions, updates) {
    return await this.sensorTypeModel.updateOne(conditions, updates);
  }

  public findSensorTypes(options) {
    return this.sensorTypeModel.find(options);
  }

  public findSensorType(options) {
    return this.sensorTypeModel.findOne(options);
  }

  public findById(id: any) {
    return this.sensorTypeModel.findById(id);
  }

	public deleteSensorType(options) {
		console.log(options)
    return this.sensorTypeModel.deleteOne(options);
  }

  public removeAll() {
    return this.sensorTypeModel.remove({});
  }
}
