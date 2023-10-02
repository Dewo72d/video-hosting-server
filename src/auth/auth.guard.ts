import { UnauthorizedException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = await context.switchToHttp().getRequest();
    const { clown_token } = req.cookies;


    if (!clown_token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.verifyAsync(clown_token, { secret: process.env.JWT });
      req.user = {
        username: user.username,
        id: user.id
      }
    } catch (error) {
      console.log("Error JWT >> \n", error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
