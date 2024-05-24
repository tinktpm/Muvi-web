import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorator';

@Controller('/api/v1/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query('limit') limit: number = 10, @Query('page') page: number = 1): Promise<User[]> {
    return await this.userService.findAll(limit, page);
  }

  @Post('/unblock')
  @Public()
  async unblock(@Body('email') email: string): Promise<User> {
    if (typeof email !== 'string') {
      throw new Error('Email must be a string');
    }
    return await this.userService.updateUserByEmail(email);
  }


  @Get('/email/:email')
  @Public()
  async findByEmail(@Param('email') email: string): Promise<User> {
    if (typeof email !== 'string') {
      throw new Error('Email must be a string');
    }
    return await this.userService.findByEmail(email);
  }

  @Get('/search/:email')
  async searchByEmail(@Param('email') email: string): Promise<User[]> {
    if (typeof email !== 'string') {
      throw new Error('Email must be a string');
    }
    console.log('email', email)
    return await this.userService.searchByEmail(email)
  }

  @Get('/getUserVip')
  async getUserVip(): Promise<User[]> {
    return await this.userService.findUserVip();
  }

  
  @Get('/checkVip/:id')
  @Public()
  async checkVip(@Param('id') id: string): Promise<boolean> {
    return await this.userService.checkVip(id);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  @Public()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }
}
