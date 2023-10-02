import { UseGuards, Request, Controller, Get, Post, Body, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
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
