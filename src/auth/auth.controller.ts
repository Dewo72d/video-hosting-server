import { UseGuards, Request, Controller, Get, Post, Body, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { SignupDto } from './dto/signup.dto';
import { AuthDto } from './dto/auth.dto';

import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get("logout")
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {

    
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
  async signUp(@Body() body: SignupDto, res: Response) {
    const user = await this.authService.signUp(body.username, body.password);

    console.log("RES AUTH >>> ", user);
    //res.send(`DONE`)

  }

}
