import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { config } from 'dotenv';

config()
@Module({
    imports: [
        JwtModule.register({
            secret: Buffer.from('ARRjiGBf+uLsc3FzLzm9aLQaM1dQrKXtrut0gwwyJIWhu8tWYmUvhUBHEkGOPl+N', "base64"),
        }),
    ],
    providers: [AuthGuard],
    exports: [AuthGuard],
})
export class AuthGuardModule {}