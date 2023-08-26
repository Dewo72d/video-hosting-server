import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(id: number, password: string) {
    const user = await this.userService.findOne(id);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, password: user.password }

    return {
      clown_token: await this.jwtService.signAsync(payload)
    }
  }


}
