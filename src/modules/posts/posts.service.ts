import { User } from './../user/user.entity';
import { PostCreateDto } from './dto/post.create.dto';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { ICustomFilterService } from '../../common/filters/icumstomFilter.service';
import { ISortingService } from '../../common/sorting/isorting.service';
import { PostQueryDto } from './dto/post.query.dto';
import { PostEntity } from './entity/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private httpService: HttpService,
    private sortingService: ISortingService,
    private customFilterService: ICustomFilterService,
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async queryPosts(postQuery: PostQueryDto): Promise<any> {
    const { tags, sortBy, direction } = postQuery;
    if (!tags) {
      throw new BadRequestException('Tags parameter is required');
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

    const observablesData = [];
    tags.split(',').forEach((tag) => {
      observablesData.push(
        this.httpService
          .get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`)
          .pipe(map((response) => response.data.posts)),
      );
    });

    const data: any = await Promise.all(
      observablesData.map((observableData) => lastValueFrom(observableData)),
    );

    const filteredData = this.customFilterService.removeDuplicateFromArray(
      data.flat(),
      'id',
    );
    return {
      posts: this.sortingService.sortArray(filteredData, sortBy, direction),
    };
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
