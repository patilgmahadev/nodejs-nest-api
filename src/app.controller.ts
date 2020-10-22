import { KeysService } from './modules/keys/keys.service';
import { ApiGuard } from './api.guard';
import { EmailService } from './email/email.service';
import { Get, Controller, Head, Headers, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Api } from './api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly email: EmailService, private readonly ks: KeysService) {
  }

  @Get()
  root(): string {
    return 'Hello world';
  }

  @Get('/protected')
  // @UseGuards(ApiGuard)
  async protected(@Headers() headers: Api) {
    return 'Your API key works';
  }
}
