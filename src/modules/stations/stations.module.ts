import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule, Module } from '@nestjs/common';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { StationSchema } from './stations.schema';
import { KeysModule } from '../keys/keys.module';
import { CronModule } from '../../cron/cron.module';
import {UsersModule} from 'modules/users/users.module';
import {AuthModule} from 'modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Station', schema: StationSchema }]),
		KeysModule,
		UsersModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })
  , CronModule,AuthModule],
  providers: [StationsService],
  exports: [StationsService],
  controllers: [StationsController],
})
export class StationsModule {
}
