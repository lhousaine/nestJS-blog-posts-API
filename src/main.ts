import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/httpException.filter';
import { LoggingInterceptor } from './common/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // configure a global exceptions handler
  app.useGlobalFilters(new HttpExceptionFilter());

  // configure a global Logging Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.setGlobalPrefix('api');

  app.enableVersioning({
    defaultVersion: ['1', '2'],
    type: VersioningType.URI,
  });
  // configure swagger  for the API, to be easy to use by front end developers
  const config = new DocumentBuilder()
    .setTitle('Blog Post Api')
    .setDescription('My blog posts quering API')
    .setVersion('1.0')
    .addTag('posts')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
