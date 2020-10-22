import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

var querystring = require('querystring');
const mailGunSender = require('mailgun-js')({
  apiKey: '5df54b1fa06aa8be5438347df6e10dc3-f45b080f-601727f8',
  domain: 'mg.cktech.eu',
});

@Injectable()
export class EmailService {

  constructor() {
  }


  sendEmail({ to, subject, text }) {

    const emailObject = {
      from: `${process.env.MAILGUN_SENDER} <${process.env.MAILGUN_DOMAIN}>`,
      to, subject, text,
    };


    return mailGunSender.messages().send(emailObject);
  }
}
