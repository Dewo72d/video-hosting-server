import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'text' })
    username: string;

    @Column({ type: 'text'  })
    password: string;

    @Column({ type: 'bigint' })
    time: number;

}
