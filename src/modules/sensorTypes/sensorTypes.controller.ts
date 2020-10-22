import { Api, QueryParams } from '../../api';
import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SensorTypesService } from './sensorTypes.service';

import { ObjectId } from 'mongodb';
import { CreateSensorTypeBody, DeleteSensorTypeParam, GetOneSensorTypeParam, UpdateSensorTypeBody, UpdateSensorTypeParam } from './sensorTypes';
import { ApiGuard } from '../../api.guard';
import { KeysService } from '../keys/keys.service';
import {Admin} from 'shared/admin-decorator';

@ApiBearerAuth()
@Controller('sensorTypes')
export class SensorTypesController {

  constructor(private sensorTypeService: SensorTypesService, private readonly ks: KeysService) {
  }

  @Get()
  @UseGuards(ApiGuard)
  async findAll(@Req() req, @Query() qparams: QueryParams, @Headers() headers: Api) {
    const query = this.sensorTypeService.findSensorTypes(qparams);
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
  async createSensorType(@Req() req, @Body() body: CreateSensorTypeBody) {
    return await this.sensorTypeService.createSensorType(body);
  }

  @Delete(':sensorTypeId')
  @ApiResponse({
    status: 200, description: `Deleted task`,
  })
  async deleteTask(@Admin('sensorTypeId') query) {
    return await this.sensorTypeService.deleteSensorType(query);
  }

  @Delete('')
  @ApiResponse({
    status: 200, description: `Deleted all`,
  })
  async deleteAllSensorTypes(@Req() req) {
    return await this.sensorTypeService.removeAll();
  }

  @Get(':sensorTypeId')
  @ApiResponse({
    status: 200, description: `{
            "id": id,
            "name": "string",
            "state": boolean
        }`,
  })
  async getOneSensorType(@Req() req, @Param() params: GetOneSensorTypeParam) {
    const query = { _id: params.sensorTypeId };
    return await this.sensorTypeService.findSensorType(query);
  }

  @Put(':sensorTypeId')
  @ApiResponse({
    status: 200, description: `{
            "id": id,
            "name": "string",
            "state": boolean
        }`,
  })
	async editTask(@Admin('sensorTypeId') query,@Body() body: UpdateSensorTypeBody) {
		return await this.sensorTypeService.updateSensorType(query, body);
  }
}
