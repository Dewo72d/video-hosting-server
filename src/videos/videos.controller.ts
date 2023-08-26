import {
    Controller,
    Get,
    UploadedFile,
    UseInterceptors,
    StreamableFile,
    Headers,
    Header,
    Res,
    HttpStatus,
    Param,
    Post, Body,
} from '@nestjs/common';

import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../configs/multer.config';

import { join } from 'path';
import { createReadStream, statSync } from 'fs';

import { VideosService } from './videos.service';

import { Video } from './entities/videos.entity';
import { CreateVideoDto } from './dto/create-video.dto';


@Controller('videos')
export class VideosController {
    constructor(private readonly videos: VideosService) {
    }


    @Get()
    async sendTest(): Promise<Video[]> {
        return this.videos.getAll();
    };


    @Get('video/:id')
    async sendRecently(@Param('id') id: string, @Headers() headers, @Res() res: Response): Promise<void | null> {

        console.log("VIDE >>> ", id);
        const video = await this.videos.getVideoPath(id);
        
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
            const head = { 'Content-Length': size, };
            res.writeHead(HttpStatus.OK, head);
            createReadStream(video).pipe(res);

        }
    }

    @Post('video/upload')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: { desc: string, name: string },
        @Res() res: Response
    ) { 
        try {
            if(data.desc.length === 0 || data.name.length === 0) throw Error("EMPTY FIELDS");

            const video = {
                video: file.filename,
                user_id: 0,
                name: data.name,
                description: data.desc,
                time: Date.now(),
            };

            await this.videos.uploadVideo(video)
            return res.writeHead(HttpStatus.OK).send();
        } catch (error) {
            console.log("ERR >> ", error, "\n");
            return res.writeHead(HttpStatus.NOT_IMPLEMENTED, "SOMETHING WENT WRONG").send();
        }
    }


}

