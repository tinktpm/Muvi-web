import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from './user.schema';
import { EurekaModule } from 'nestjs-eureka';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuardModule } from './auth.guard.module';

@Module({
  imports: [
    EurekaModule.forRoot({
      disable: false,
      disableDiscovery: false,
      eureka: {
          host: process.env.EUREKA_HOST || 'localhost',
          port: process.env.EUREKA_PORT || 8761,
          servicePath: '/eureka/apps',
          maxRetries: 10,
          requestRetryDelay: 10000,
      },
      service: {
          name: 'user-service',
          port: parseInt(process.env.APP_PORT) || 5002,
          host: 'localhost',
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb+srv://sang05112003:sang@cluster0.ek28moa.mongodb.net/soa_final?retryWrites=true&w=majority&appName=Cluster0',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthGuardModule,
    JwtModule.register({
      secret: 'ARRjiGBf+uLsc3FzLzm9aLQaM1dQrKXtrut0gwwyJIWhu8tWYmUvhUBHEkGOPl+N',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
