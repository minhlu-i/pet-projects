import * as argon from 'argon2';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { LoginDto, RegisterDto } from './dto/auth.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerData: RegisterDto) {
    try {
      const hashPassword = await argon.hash(registerData.password);
      const user = await this.prismaService.user.create({
        data: {
          email: registerData.email,
          hashed_password: hashPassword,
        },
        select: {
          id: true,
          email: true,
          created_at: true,
        },
      });
      return user;
    } catch (error) {
      if (error.code == 'P2002') {
        console.log(
          '🚀 ~ file: auth.service.ts:33 ~ AuthService ~ register ~ error:',
          error,
        );
        throw new ForbiddenException('register_error');
      }
    }
  }

  async login(loginData: LoginDto) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email: loginData.email },
      });
      const isMatchedPassword = await argon.verify(
        user.hashed_password,
        loginData.password,
      );
      if (!isMatchedPassword) {
        throw new ForbiddenException('login_error');
      }
      return { token: await this.convertToJwtString(user.id, user.email) };
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.service.ts:52 ~ AuthService ~ login ~ error:',
        error,
      );
      if (error.code == 'P2025') {
        throw new ForbiddenException('login_error');
      }
    }
  }

  async convertToJwtString(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email: email,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
