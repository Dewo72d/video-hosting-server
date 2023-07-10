import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Video } from './entities/videos.entity';
import { CreateVideoDto } from './dto/create-video.dto';


@Injectable()
export class VideosService {

    constructor(
        @InjectEntityManager()
        private repository: EntityManager,
    ) {
    }

    public async getAll(): Promise<Video[]> {
        const res = await this.repository.find(Video);
        return res;
    };

    public async getVideoPath(id: number): Promise<string | null> {

        const res = await this.repository.findOne(Video, { where: { id: id } });

        if (res === null) return null;
        console.log('RES >>> ', res);
        return `/video-server/videos/${res.videoid}.mp4`;
    }

    public async uploadVideo(videoDto: CreateVideoDto): Promise<string> {
        console.log('DTO >>> ', videoDto);
        const res = await this.repository.save(Video, {
            name: videoDto.name,
            description: videoDto.description,
            userid: videoDto.userid,
            time: videoDto.time,
            videoid: videoDto.videoid,
        });
        console.log('RES >>> ', res);
        return 'kryto';
    }
}
