import { Video } from "../entities/videos.entity";

export type VideoWithUsername = Omit<Video, "user"> ;