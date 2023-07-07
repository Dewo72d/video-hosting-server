import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'integer' })
    length: number;

    @Column({ type: 'bigint' })
    time: number;

    @Column({ type: 'integer' })
    userid: number;

}
