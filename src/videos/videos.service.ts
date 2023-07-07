import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Video } from './entities/videos.entity';


@Injectable()
export class VideosService {

    constructor(
        @InjectEntityManager()
        private repository: EntityManager,
    ) {
    }

    public async getAll(): Promise<Video[]> {
        const res = await this.repository.find(Video);
        console.log('RES >>> ', res);
        return res;
    };

    public async getVideoPath(id: number): Promise<string|null> {

        const res = await this.repository.findOne(Video, { where: { id: id } });

        if (res === null) return null;

        return `/video-server/videos/${res.id}.mp4`;
    }
}
