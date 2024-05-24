import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRequestDto, RegisterRequestDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { User } from './user.schema';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(data: AuthRequestDto){
    const user = await this.getUserByEmail(data.email);
    if (!user) {
      console.log('vong 1')
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      console.log('vong 2')

      throw new UnauthorizedException('Invalid credentials');
    }

    // if(!user.isAdmin){
    //   console.log('vong 3')

    //   throw new UnauthorizedException('Invalid credentials');
    // }

    const token = this.generateToken(user.id, user.isAdmin, user.isVip, user.isBlocked);
    let userCopy = { ...user, userId: user._id };
    delete userCopy._id;
    delete userCopy.password
    return { 'token' : token.token, 'refresh_token': token.refreshToken, user: userCopy};
  }

  async loginWithGoogle(data: any){
    const user = await this.getUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(user._id, user.isAdmin, user.isVip, user.isBlocked);
    return { 'token' : token.token, 'refresh_token': token.refreshToken, 'userId': user._id, 'name': user.name, 'email': user.email};
  }

  async register(data: RegisterRequestDto){
    console.log('registerrr')
    const user = await this.getUserByEmail(data.email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    await this.sendEmail(data.email)

    const hashedPassword = await this.hashPassword(data.password);
    const response = await axios.post(this.configService.get('URL_USER_SERVICE'), {
      ...data,
      password: hashedPassword,
    });

    return response.data;
  }

  
  private generateToken(userId: string, isAdmin: boolean, isVip: boolean, isBlocked: boolean) {
    const payload = { sub: userId };
    const token = jwt.sign(payload, Buffer.from(this.configService.get<string>('JWT_SECRET'), "base64"));
    const refreshTokenPayload = { sub: userId, type: 'refresh' };
    const refreshToken = this.jwtService.sign(refreshTokenPayload, { expiresIn: '365d' });
  
    return { token, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private async getUserByEmail(email: string) {
    try {
      const response = await axios.get(this.configService.get('URL_USER_SERVICE') + '/email/' + email);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  private async sendEmail(email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "nguyenhuutin124@gmail.com",
        pass: "bddp roje wrvm fpvy",
      },
    });
    try {
      // const response = await axios.post(this.configService.get('URL_EMAIL_SERVICE'), {
      //   email,
      //   subject,
      //   content,
      // });
      // return response.data;
      const mailOptions = {
        from: 'nguyenhuutin124@gmail.com',
        to: email,
        subject: 'Xác nhận đăng ký tài khoản',
        text: 'Hello world?',
        html: `Vui lòng nhấn vào link sau để xác nhận đăng kí <a href='http://localhost:5001/api/v1/auth/verify_register?email="${email}"'>Xác nhận đăng kí</a>`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
    }
  }


  async verifyRegister(email: string) {
    try {
      const response = await axios.post(this.configService.get('URL_USER_SERVICE') + '/unblock', {
        email,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

}
