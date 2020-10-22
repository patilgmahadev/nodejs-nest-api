import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule, Module } from '@nestjs/common';
import { SensorTypesController } from './sensorTypes.controller';
import { SensorTypesService } from './sensorTypes.service';
import { SensorTypeSchema } from './sensorTypes.schema';
import { KeysModule } from '../keys/keys.module';
import {UsersModule} from 'modules/users/users.module';
import {AuthModule} from 'modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SensorType', schema: SensorTypeSchema }]),
		HttpModule,
		UsersModule,
    KeysModule,AuthModule],
  providers: [SensorTypesService],
  exports: [SensorTypesService],
  controllers: [SensorTypesController],
})
export class SensorTypesModule {
}
