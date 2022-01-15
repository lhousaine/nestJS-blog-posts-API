import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(CacheInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  queryPosts(
    @Query('tags') tags: string,
    @Query('sortBy') sortBy: string,
    @Query('direction') direction: string,
  ) {
    return this.postsService.queryPosts({
      tags,
      sortBy,
      direction,
    });
  }
}
