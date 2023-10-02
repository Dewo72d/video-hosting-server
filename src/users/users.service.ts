import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { EntityManager } from "typeorm";
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectEntityManager()
    private repo: EntityManager
  ) { }

  async create(createUserDto: CreateUserDto) {
    const res = await this.repo.save(User, { username: createUserDto.username, password: createUserDto.password, time: createUserDto.time })
    console.log("DB SIGNUP RES >> ", createUserDto);
    return res;

  }

  async findOne(username: string) {
    const res = await this.repo.findOne(User, { where: { username: username } });
    if (res === null) return null;
    return res;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
