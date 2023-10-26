import { unlink, access, constants } from 'fs/promises';

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';


import { CreateVideoDto } from './dto/create-video.dto';
import { VideoWithUsername } from './dto/video-with-username.dto';

import { Video } from './entities/videos.entity';


/**
 * @todo pagitanion
 */

@Injectable()
export class VideosService {

    constructor(
        @InjectEntityManager()
        private repository: EntityManager,
    ) { }


    public async getAll(page: number = 1): Promise<VideoWithUsername[]> {
        const limit = 10;
        const offset = (page - 1) * limit;


        const res = await this.repository.find(Video, {
            relations: ["user"],
            skip: offset,
            take: limit
        });

        const obj = res.map(video => ({
            ...video,
            user: { username: video.user.username }
        }));

        return obj;
    };

    public async getUserVideos(uid: number): Promise<VideoWithUsername[]> {
        const res = await this.repository.find(Video, { relations: ["user"], where: { user_id: uid } })


        const obj = res.map(video => ({
            ...video,
            user: { username: video.user.username }
        }));

        return obj;
    }

    public async getVideoPath(id: number): Promise<string | null> {

        const res = await this.repository.findOne(Video, { where: { id: id } });

        if (res === null) return null;
        return `/video-server/videos/${res.video}`;
    }

    public async uploadVideo(videoDto: CreateVideoDto): Promise<void> {
        const res = await this.repository.save(Video, {
            name: videoDto.name,
            description: videoDto.description,
            user_id: videoDto.user_id,
            time: videoDto.time,
            video: videoDto.video,
        });
    }

    public async deleteVideo(uid: number, vid: number): Promise<boolean> {
        try {
            const videoData = await this.repository.findOne(Video, { where: { id: vid, user_id: uid } })
            const path = `/video-server/videos/${videoData.video}`;

            await this.repository.delete(Video, { id: vid, user_id: uid });

            await access(path, constants.F_OK);
            await unlink(path);

            return true;


        } catch (error) {
            console.log("DELETE FILE ERROR >>>> ", error);
            if (error.code === "ENOENT") {
                return true
            }
            return false;
        }
    }
}
