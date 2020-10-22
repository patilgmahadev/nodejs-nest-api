import { EmailService } from './email.service';
import { Module, HttpModule } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {
}
