import { User } from './../user/user.entity';
import { PostCreateDto } from './dto/post.create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomFilterService } from '../../common/filters/icumstomFilter.service';
import { ISortingService } from '../../common/sorting/isorting.service';
import { PostQueryDto } from './dto/post.query.dto';
import { PostEntity } from './entity/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private sortingService: ISortingService,
    private customFilterService: ICustomFilterService,
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  queryPostsByTag(postQueryDto: PostQueryDto) {
    const { tag, sortBy, direction } = postQueryDto;
    if (!tag) {
      throw new BadRequestException('Tag parameter is required');
    }
    if (
      sortBy === '' ||
      (sortBy && !['id', 'reads', 'likes', 'popularity'].includes(sortBy))
    ) {
      throw new BadRequestException('sortBy parameter is invalid');
    }
    if (
      direction === '' ||
      (direction && !['asc', 'desc'].includes(direction))
    ) {
      throw new BadRequestException('direction parameter is invalid');
    }
    return this.postsRepository
      .createQueryBuilder('posts')
      .where(":tag = ANY ( string_to_array(posts.tags, ','))", { tag: tag })
      .orderBy(sortBy)
      .getMany();
  }

  create(postDto: PostCreateDto) {
    const author = new User();
    author.id = postDto.authorId;
    let newPost = {
      ...postDto,
      author,
    };
    newPost = this.postsRepository.create(newPost);
    console.log(newPost);
    return this.postsRepository.save(newPost);
  }

  findPostById(id: number) {
    return this.postsRepository.findOne(id);
  }

  findAll() {
    return this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .getMany();
  }

  remove(id: number) {
    this.postsRepository.delete(id);
  }
}
