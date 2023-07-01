import { Controller, Get, StreamableFile, Headers, Header, Res, HttpStatus } from '@nestjs/common';
import { VideosService } from '../services/videos.service';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';


@Controller('videos')
export class VideosController {
    constructor(private readonly videos: VideosService) {
    }

    @Get()
    async sendRecently() {
        return this.videos.sendRecently();
    }

    @Header('Accept-Ranges', 'bytes')
    @Header('Content-Type', 'video/mp4')
    @Get('get')
    async sendVideo(@Headers() headers, @Res() res: Response) {
        const video = "/video-server/videos/kek.mp4";

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