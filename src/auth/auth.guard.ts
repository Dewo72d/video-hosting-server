import { UnauthorizedException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {clown_token} = await context.switchToHttp().getRequest().cookies;

    console.log("req.cookies>>>", clown_token);

    if (!clown_token) {
      throw new UnauthorizedException();
    }

    try {
      const verifyToken = await this.jwtService.verifyAsync(clown_token, { secret: process.env.JWT })
      console.log("verifyToken >> ", verifyToken);
    } catch (error) {
      console.log("Error JWT >> ", error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
