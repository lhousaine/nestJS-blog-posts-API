import { User } from './../../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Exclude()
  @Column()
  authorId: number;
  @Column()
  likes: number;
  @Column()
  popularity: number;
  @Column()
  reads: number;
  @Column('simple-array')
  tags: string[];
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: User;
}
