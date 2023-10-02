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
    const user = await this.userService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, password: user.password, id: user.id }

    return await this.jwtService.signAsync(payload);

  }

  async signUp(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (user) throw Error("A user with this nickname exists");

    const newUser = await this.userService.create({
      username,
      password,
      time: Date.now()
    });

    console.log("FINALY RES >>>> ", newUser);

    return "user has been created"


  }

}
