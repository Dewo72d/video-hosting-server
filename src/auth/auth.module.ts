import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';


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
