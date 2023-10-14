import { Video } from 'src/videos/entities/videos.entity';
import { Column, Unique, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'text' })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'bigint' })
    time: number;
    
    @OneToMany(() => Video, video => video.user)
    videos: Video[];
}
