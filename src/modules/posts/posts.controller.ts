import { PostCreateDto } from './dto/post.create.dto';
import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(CacheInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() post: PostCreateDto) {
    console.log(post);
    return this.postsService.create(post);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findPostById(@Param('id') id: number) {
    return this.postsService.findPostById(id);
  }

  @Get(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }

  @Get('list/filter')
  queryPostsByTag(
    @Query('tag') tag: string,
    @Query('sortBy') sortBy: string,
    @Query('direction') direction: string,
  ) {
    return this.postsService.queryPostsByTag({
      tag,
      sortBy,
      direction,
    });
  }
}
