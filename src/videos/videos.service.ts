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
    ) { }

    public async getAll(): Promise<Video[]> {
        const res = await this.repository.find(Video);
        return res;
    };

    public async getVideoPath(video: string): Promise<string | null> {

        const res = await this.repository.findOne(Video, { where: { video: video } });

        if (res === null) return null;
        console.log('RES >>> ', res);
        return `/video-server/videos/${res.video}`;
    }

    public async uploadVideo(videoDto: CreateVideoDto): Promise<void> {
        console.log('DTO >>> ', videoDto);
        const res = await this.repository.save(Video, {
            name: videoDto.name,
            description: videoDto.description,
            user_id: videoDto.user_id,
            time: videoDto.time,
            video: videoDto.video,
        });
    }
}
