// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBConfigService } from './mongodbConfig.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoDBConfigService,
      inject: [MongoDBConfigService],
    }),
  ],
})
export class AppModule {}
