import { UseGuards, Request, Controller, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req) {
    //console.log("CONTROLLER >>>> ", req);
    
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: AuthDto) {
    return this.authService.signIn(body.id, body.password);
  }

}
