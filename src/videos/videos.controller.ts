import { Controller, Get, StreamableFile, Headers, Header, Res, HttpStatus, Param } from '@nestjs/common';

import { Response } from 'express';
import { join } from 'path';

import { createReadStream, statSync } from 'fs';

import { VideosService } from './videos.service';
import { Video } from './entities/videos.entity';

@Controller('videos')
export class VideosController {
    constructor(private readonly videos: VideosService) {
    }


    @Get('test')
    async sendTest(): Promise<Video[]> {
        return this.videos.getAll();
    };


    @Get(':id')
    async sendRecently(@Param('id') id: string, @Headers() headers, @Res() res: Response): Promise<void | null> {
        const video = await this.videos.getVideoPath(+id);
        if (video === null) return null;

        const { size } = statSync(video);
        const videoRange = headers.range;
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, '').split('-');

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : size - 1;

            const chunkSize = (end - start) + 1;

            const readStreamFile = createReadStream(video, { start, end, highWaterMark: 60 });

            const head = {
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Content-Length': chunkSize,
            };
            res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
            readStreamFile.pipe(res);
        } else {
            const head = {
                'Content-Length': size,
            };
            res.writeHead(HttpStatus.OK, head);
            createReadStream(video).pipe(res);

        }
    }


}

