import { Controller, Get } from '@nestjs/common';
import { VideosService } from '../services/videos.service';

@Controller('videos')
export class VideosController {
    constructor(private readonly videos: VideosService) {
    }

    @Get()
    async sendRecently() {
        return this.videos.sendRecently();
    }
}