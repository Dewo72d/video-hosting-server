import { HttpCode, HttpStatus, Controller, Get, Post, Body, Param, UseGuards, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import { RequestJWTUser } from 'src/Interfaces/RequestJWTUser';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('/user/:username')
  async findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }


  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/user/change/username')
  async changeUsername(
    @Req() req: RequestJWTUser,
    @Res() res: Response,
    @Body() username: { username: string }
  ) {
    const result = await this.usersService.updateUser(req.user.id, username.username, "username");

    if (result) {
      res.send(result)
    
    } else {
      res.sendStatus(500)
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/user/change/password')
  async changePassword(
    @Req() req: RequestJWTUser,
    @Res() res: Response,
    @Body() password: { password: string }
  ) {
    const result = await this.usersService.updateUser(req.user.id, password.password, "password");

    if (result) {
      res.send(result)
    } else {
      res.sendStatus(500)
    }

  }
}
