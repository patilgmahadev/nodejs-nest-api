import { Model, ObjectID } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { Station } from './stations.interface';
import { CronService } from '../../cron/cron.service';
import { getAllLocalLocations } from '../../providers/gios/gios.util';

@Injectable()
export class StationsService {
  constructor(
    @InjectModel('Station') private readonly stationModel: Model<Station>,
    private readonly httpService: HttpService,
    private cronService: CronService
  ) {
    // this.getLocalStations();
    // getAllLocalLocations();
  }

  /**
   * createStation
   */
  public async createStation(station : Station) {
    return await new this.stationModel(station).save();
  }

  /**
   * updateStation
   */
  public async updateStation(conditions, updates) {
    return await this.stationModel.updateOne(conditions, updates);
  }

  /**
   * findStations
   */
  public findStations(options) {
    return this.stationModel.find(options);
  }

  public findStation(options) {
    return this.stationModel.findOne(options);
  }

  public findById(id: any) {
    return this.stationModel.findById(id);
  }

  public deleteStation(options) {
    return this.stationModel.deleteOne(options);
  }

  public getLocalStations() {
    // start();
    // this.httpService.get('http://api.gios.gov.pl/pjp-api/rest/station/findAll').subscribe(data => {
    //   console.log(data);
    // })
  }
}
