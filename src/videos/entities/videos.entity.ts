import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'text' })
    video: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'bigint' })
    time: number;

    @Column({ type: 'integer' })
    user_id: number;

    @ManyToOne(() => User, user=>user.videos)
    @JoinColumn({name:"user_id"})
    user:User
}
