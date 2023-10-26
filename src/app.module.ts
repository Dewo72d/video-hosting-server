import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { VideosModule } from './videos/videos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

//Entities
import { Video } from './videos/entities/videos.entity';
import { User } from './users/entities/user.entity';


@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal:true }),
        TypeOrmModule.forRoot({
            port: +(process.env.DB_PORT),
            host: '0.0.0.0',
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            type: 'postgres',
            entities: [Video, User],
            synchronize:false, // never use TRUE in production!

        }),
        VideosModule,
        AuthModule,
        UsersModule,
    ],
    /* controllers: [VideosController], */
    /* providers: [VideosService], */
})
export class AppModule {
}
