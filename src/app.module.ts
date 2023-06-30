import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { VideosController } from './controllers/videos.controller';
import { VideosService } from './services/videos.service';

@Module({
    imports: [],
    controllers: [AppController, VideosController],
    providers: [AppService, VideosService],
})
export class AppModule {
}
