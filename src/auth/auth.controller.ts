import { Req, UseGuards, Controller, Get, Post, Body, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

import { AuthGuard } from '../guards/auth.guard';

import { SignupDto } from './dto/signup.dto';
import { AuthDto } from './dto/auth.dto';

import { RequestJWTUser } from 'src/Interfaces/RequestJWTUser';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getProfile(@Req() req: RequestJWTUser, @Res({ passthrough: true }) res: Response) {
    const result = await this.usersService.findOne(req.user.id)
    const user = { ...result }
    delete user.password

    
    res.send(user);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get("logout")
  async logout(@Res({ passthrough: true }) res: Response) {


    res.cookie('clown_token', '', { sameSite: "none", secure: true })
    res.send();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: AuthDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signIn(body.username, body.password);

    res.cookie('clown_token', token, { sameSite: "none", secure: true });
    res.send("Done");
  }

  @Post("signup")
  async signUp(@Body() body: SignupDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.signUp(body.username, body.password);

    res.send(result)
  }

}
