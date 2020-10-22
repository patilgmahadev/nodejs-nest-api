import { KeySchema } from './keys.schema';
import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Key', schema: KeySchema }])],
  providers: [KeysService],
  exports: [KeysService],
  controllers: [KeysController],
})
export class KeysModule {
}
