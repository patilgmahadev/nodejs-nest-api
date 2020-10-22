import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataSchema } from './data.schema';
import { KeysModule } from '../keys/keys.module';
import { DataService } from './data.service';
import { UsersModule } from 'modules/users/users.module';
import {AuthModule} from 'modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Data', schema: DataSchema }]),
    KeysModule, UsersModule,AuthModule],
  providers: [DataService],
  exports: [DataService],
  controllers: [DataController],
})
export class DataModule {
}
