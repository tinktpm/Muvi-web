import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setContact("Nguyen Huu Tin", "google.com", "nguyenhuutin124@gmail.com")
    .setVersion('v1')
    .setTitle('Auth service')
    .setDescription('The auth API description')
    .addTag('Auth')
    .setLicense("api gateway licence", "www.api-gateway.com/licence")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const options: SwaggerCustomOptions  =  {
    jsonDocumentUrl: '/api/v1/auth-swagger/v3/api-docs'
  };
  SwaggerModule.setup('/api', app, document, options);
  
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(5001);
}
bootstrap();
