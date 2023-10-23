import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }


  async signIn(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, id: user.id }

    return this.jwtService.signAsync(payload);

  }

  async refreshToken(id: number, username: string) {

    const payload = { username: username, id: id }

    return this.jwtService.signAsync(payload);
  }

  async signUp(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    if (user) {
      return "A user with this nickname exists"
    }

    await this.userService.create({
      username,
      password,
      time: Date.now()
    });

    return "user has been created"


  }

}
