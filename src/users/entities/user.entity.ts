import { Column,Unique, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@Unique(['username'])
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
