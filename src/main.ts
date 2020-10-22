import { UserSchema } from './modules/users/users.schema';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

process.env.NODE_ENV === 'production' ? require('dotenv').config({ path: 'prod.env' })
  : require('dotenv').config({ path: 'dev.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addTag('Todo')
    .setBasePath('/api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5001);
}

bootstrap();
