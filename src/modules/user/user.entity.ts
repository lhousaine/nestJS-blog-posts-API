import { PostEntity } from './../posts/entity/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Role } from 'src/common/helpers/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false })
  username: string;

  @Expose()
  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany((type) => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @Column('text', { nullable: true, array: true })
  roles: Role[];
}
