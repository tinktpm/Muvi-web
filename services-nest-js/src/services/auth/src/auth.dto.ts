import { Prop } from "@nestjs/mongoose";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AuthRequestDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class AuthResponseDto{
    token: string;
}

export class RegisterRequestDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    // @IsNotEmpty()
    // gender: number;

    // @IsNotEmpty()
    // birthdate: Date;

    // @IsString()
    // phoneNumber: string;

    // @IsDate()
    // vipDeadline: Date;

}