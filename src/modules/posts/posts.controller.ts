import { PostCreateDto } from './dto/post.create.dto';
import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Role } from 'src/common/helpers/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
@UseInterceptors(CacheInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles(Role.Author)
  async create(@Body() post: PostCreateDto) {
    console.log(post);
    return this.postsService.create(post);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  findPostById(@Param('id') id: number) {
    return this.postsService.findPostById(id);
  }

  @Get(':id')
  @Roles(Role.Admin)
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
