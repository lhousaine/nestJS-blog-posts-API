import { User } from './../../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ColumnNumericTransformer } from '../../../common/helpers/number-transformer';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Exclude()
  @Column()
  authorId: number;
  @Column()
  likes: number;
  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  popularity: number;
  @Column()
  reads: number;
  @Column('simple-array')
  tags: string[];
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: User;
}
