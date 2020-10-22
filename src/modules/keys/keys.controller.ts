import { QueryParams } from '../../api';
import * as mongoose from 'mongoose';
import { KeysService } from './keys.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Controller, Headers, Get, Post, Req, Delete, Put, Body, Param, UseGuards, Header, Query } from '@nestjs/common';
import { createKeyReq, deleteKeyParam, getOneKeyParam, editKeyParam, editKeyBody } from './keys';
import 'passport-jwt';

var ObjectId = mongoose.Types.ObjectId;


@ApiBearerAuth()
@Controller('keys')
export class KeysController {

  constructor(private ps: KeysService) {

  }

  @Get()
  @ApiResponse({
    status: 200, description: `[{
            "_id": ObjectId("5b907fa25137ec1f610d8f72"),
            "key": "sasa",
            "description": "password",
            "active": true,
        }]`,
  })
  async findAll(@Req() req, @Query() qparams: QueryParams) {
    let search = Object.assign({}, qparams);
    delete search.skip;
    delete search.limit;
    delete search.sort;
    const query = this.ps.findKeys(search, qparams);
    const allKeys = await query;
    return allKeys;
  }

  @ApiResponse({
    status: 200, description: `5b9be92040c4aaa6ceecd242`,
  })
  @Post()
  async createKey(@Req() req, @Body() body: createKeyReq) {
    const { description } = body;
    const key = new ObjectId().toString();
    const val = { key, description, active: true };
    await this.ps.createKey(val);
    return key;
  }

  @Delete(':key_id')
  @ApiResponse({
    status: 200, description: `Deleted Key`,
  })
  async deleteKey(@Req() req, @Param() params: deleteKeyParam) {
    let id = params.key_id;
    const query = { _id: id };
    await this.ps.deleteKey(query);
    return 'Deleted Key';
  }

  @Get(':key_id')
  @ApiResponse({
    status: 200, description: `{
            "_id": ObjectId("5b907fa25137ec1f610d8f72"),
            "key": "sasa",
            "description": "password",
            "active": true,
        }`,
  })
  async getOneKey(@Req() req, @Param() params: getOneKeyParam) {
    let id = params.key_id;
    const query = { _id: id };
    const key = await this.ps.findKey(query);
    return key;
  }


  @Put(':key_id')
  @ApiResponse({
    status: 200, description: `{
            "_id": ObjectId("5b907fa25137ec1f610d8f72"),
            "key": "sasa",
            "description": "password",
            "active": true,
        }`,
  })
  async editKey(@Req() req, @Param() params: editKeyParam, @Body() body: editKeyBody) {
    let id = params.key_id;
    const { key, active, description } = body;
    const query = { _id: id };
    const result = await this.ps.updateKey(query, { key, active, description });
    return result;
  }
}
