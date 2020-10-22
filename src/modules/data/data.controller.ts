import { Api, QueryParams } from '../../api';
import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DataService } from './data.service';

import { ObjectId } from 'mongodb';
import { ApiGuard } from '../../api.guard';
import { KeysService } from '../keys/keys.service';
import { CreateDataBody, DeleteDataParam, GetOneDataParam, UpdateDataBody, UpdateDataParam } from './data';
import {Admin} from 'shared/admin-decorator';

@ApiBearerAuth()
@Controller('data')
export class DataController {

  constructor(private dataService: DataService, private readonly ks: KeysService) {
  }

  @Get()
  @UseGuards(ApiGuard)
	async findAll(@Req() req,@Query() qparams: QueryParams,@Headers() headers: Api) {

    const query = this.dataService.findData(qparams);
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
  async createData(@Req() req, @Body() body: CreateDataBody) {
    return await this.dataService.createData(body);
  }

  @Delete(':dataId')
  @ApiResponse({
    status: 200, description: `Deleted task`,
  })
  async deleteData(@Admin('dataId') query) {
    return await this.dataService.deleteData(query);
  }

  @Get(':dataId')
  @ApiResponse({
    status: 200, description: `{
            "id": id,
            "name": "string",
            "state": boolean
        }`,
  })
  async getOneData(@Req() req, @Param() params: GetOneDataParam) {
    const query = { _id: params.dataId };
    return await this.dataService.findOneData(query);
  }

  @Put(':dataId')
  @ApiResponse({
    status: 200, description: `{
            "id": id,
            "name": "string",
            "state": boolean
        }`,
  })
  async editData(@Admin('dataId') query,@Body() body: UpdateDataBody) {
    return await this.dataService.updateData(query, body);
  }
}
