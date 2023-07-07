import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { VideosModule } from './videos/videos.module';
import { VideosController } from './videos/videos.controller';
import { VideosService } from './videos/videos.service';
import { Video } from './videos/entities/videos.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: './env' }),
        TypeOrmModule.forRoot({
            port: 5432,
            host: '0.0.0.0',
            username: 'postgres',
            password: 'bigfuckinpassword',
            database: 'videos',
            type: 'postgres',
            entities: [Video],
            synchronize: true, // never use TRUE in production!

        }),
        VideosModule,
    ],
    controllers: [VideosController],
    providers: [VideosService],
})
export class AppModule {
}
