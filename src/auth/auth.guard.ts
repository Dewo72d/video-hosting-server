import { UnauthorizedException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.query.clown_token;

    //console.log("REQ >>>> ", token);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const verifyToken = await this.jwtService.verifyAsync(token, {secret: process.env.JWT})
      console.log("verifyToken >> ", verifyToken);
    } catch (error) {
      console.log("Error JWT >> ", error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
