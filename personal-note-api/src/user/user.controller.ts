import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get()
  async getInformation(@GetUser() user: User) {
    return user;
  }
}
