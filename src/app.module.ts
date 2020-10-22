import { MainMiddleware } from './main.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UsersService } from './modules/users/users.service';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthService } from './modules/auth/auth.service';
import { EmailModule } from './email/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CronModule } from './cron/cron.module';
import { KeysModule } from './modules/keys/keys.module';
import { SensorTypesModule } from './modules/sensorTypes/sensorTypes.module';
import { SensorTypesController } from './modules/sensorTypes/sensorTypes.controller';
import { UsersController } from './modules/users/users.controller';
import { StationsModule } from './modules/stations/stations.module';
import { StationsController } from './modules/stations/stations.controller';
import { HttpErrorFilter } from './shared/http-error.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { DataController } from './modules/data/data.controller';
import { DataModule } from './modules/data/data.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO),
    UsersModule,
    AuthModule,
    EmailModule,
    CronModule,
    KeysModule,
    SensorTypesModule,
    StationsModule,
    DataModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
		UsersService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
		},
		AuthService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MainMiddleware)
      .exclude(
        { path: 'sensorTypes', method: RequestMethod.GET },
        { path: 'stations', method: RequestMethod.GET },
				{path: 'data',method: RequestMethod.GET},
				{ path: 'auth/refresh_token', method: RequestMethod.POST },
      )
      .forRoutes(
        UsersController,
        SensorTypesController,
        StationsController,
        DataController
      )
    ;
  }
}