import { Api, QueryParams } from '../../api';
import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { StationsService } from './stations.service';

import { ObjectId } from 'mongodb';
import { CreateStationBody, DeleteStationParam, GetOneStationParam, UpdateStationBody, UpdateStationParam } from './stations';
import { ApiGuard } from '../../api.guard';
import { KeysService } from '../keys/keys.service';
import { CronService } from '../../cron/cron.service';
import {Admin} from 'shared/admin-decorator';

@ApiBearerAuth()
@Controller('stations')
export class StationsController {

  constructor(private stationService: StationsService, private readonly ks: KeysService) {
  }

  @Get()
  @UseGuards(ApiGuard)
  async findAll(@Req() req, @Query() qparams: QueryParams, @Headers() headers: Api) {
    // const key = await this.ks.findKey({ key: headers.api_key });
    // if (!key || !key.active) throw new HttpException('Invalid API key', HttpStatus.FORBIDDEN);

    const query = this.stationService.findStations(qparams);
    return await query;
  }

  @Post()
  @ApiResponse({
    status: 200, description: `{
              "_id": "123",
              "paramName": "example",
              "paramCode": "example",
              "idParam": 0,
              "__v": 0
    }`,
  })
  async createStation(@Req() req, @Body() body: CreateStationBody) {
    return await this.stationService.createStation(body);
  }

  @Delete(':sensorTypeId')
  @ApiResponse({
    status: 200, description: `Deleted task`,
  })
  async deleteStation(@Admin('stationId') query) {
    return await this.stationService.deleteStation(query);
  }

  @Get(':sensorTypeId')
  @ApiResponse({
    status: 200, description: `{
            "id": id,
            "name": "string",
            "state": boolean
        }`,
  })
  async getOneStation(@Req() req, @Param() params: GetOneStationParam) {
    const query = { _id: params.stationId };
    return await this.stationService.findStation(query);
  }

  @Get('/getGios')
  getGiosStations(@Req() req) {
    console.log('get gios');
    return {status: 'OK'}
  }

  @Put(':sensorTypeId')
  @ApiResponse({
    status: 200, description: `{
            "id": id,
            "name": "string",
            "state": boolean
        }`,
  })
  async editStation(@Admin('stationId') query, @Body() body: UpdateStationBody) {
    return await this.stationService.updateStation(query, body);
  }
}
