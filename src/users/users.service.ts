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

    return res;

  }

  async findOneByUsername(username: string) {
    const res = await this.repo.findOne(User, { where: { username: username } });
    if (res === null) return null;
    return res;
  }

  async findOne(id: number) {
    const res = await this.repo.findOne(User, { where: { id: id } });
    if (res === null) return null;
    return res;
  }

  async updateUser(id: number, value: string, type: string): Promise<Boolean> {

    try {  
      const opt = type === "username" ? { username: value } : { password: value }

      const res = await this.repo.update(User, { id: id }, opt);

      if (res.affected > 0) return true

    } catch (error) {
      console.log("ERROR CHANGE USER >>> ", error);

      return false
    }
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
