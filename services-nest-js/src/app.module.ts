import { Module } from '@nestjs/common';
import { UserService } from './services/user/src/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot
    ({
      isGlobal: true,
      envFilePath: '.env',
    })
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
