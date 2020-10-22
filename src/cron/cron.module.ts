import { CronService } from './cron.service';
import { Module, HttpModule } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {
}
