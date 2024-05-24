import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
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
    .setTitle('User service')
    .setDescription('The user API description')
    .addTag('user')
    .setLicense("api gateway licence", "www.api-gateway.com/licence")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const options: SwaggerCustomOptions  =  {
    jsonDocumentUrl: '/api/v1/user-swagger/v3/api-docs'
  };
  SwaggerModule.setup('/api', app, document, options);
  await app.listen(5002);
}
bootstrap();
