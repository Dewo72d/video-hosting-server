import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { Video } from './entities/videos.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Video]),UsersModule],
    controllers: [VideosController],
    providers: [VideosService],

})
export class VideosModule {
}
