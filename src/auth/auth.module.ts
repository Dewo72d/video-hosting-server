import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from '../users/users.module';


@Module({

  imports:[
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal:true }),
    UsersModule,
    JwtModule.register({
      global:true,
      secret:process.env.JWT,
      signOptions:{
        expiresIn:"1h"
      }
    })

  ],
  controllers: [AuthController],
  providers: [AuthService],
  
})
export class AuthModule {}
