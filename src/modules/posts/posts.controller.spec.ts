import { HttpModule } from '@nestjs/axios';
import { BadRequestException, CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from '../../common/common.module';
import { PostResponseDto } from './dto/post.reponse.dto';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: PostsService;

  const postsData: PostResponseDto[] = [
    {
      author: 'Zackery Turner',
      authorId: 12,
      id: 1,
      likes: 469,
      popularity: 0.68,
      reads: 406,
      tags: ['startups', 'tech', 'history'],
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 2,
      likes: 735,
      popularity: 0.76,
      reads: 777,
      tags: ['culture', 'science'],
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 3,
      likes: 735,
      popularity: 0.76,
      reads: 1004,
      tags: ['health'],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        HttpModule,
        CacheModule.register({
          ttl: 0,
          isGlobal: true,
        }),
      ],
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shoud throw BadRequestException query params doent defined or invalid', async () => {
    try {
      jest
        .spyOn(postsService, 'queryPosts')
        .mockImplementation(async () => null);
      await controller.queryPosts('', null, null);
    } catch (err) {
      expect(postsService.queryPosts).toBeCalledTimes(1);
      expect(err instanceof BadRequestException).toBeTruthy();
      expect(err.error).toBe('Tags parameter is required');
    }
  });

  it('shoud get posts with tags contains culture and history', async () => {
    jest
      .spyOn(postsService, 'queryPosts')
      .mockImplementation(async () => postsData.slice(0, 2));
    const posts = await controller.queryPostsByTag('culture,history', null, null);

    expect(postsService.queryPostsByTag).toBeCalledTimes(1);

    expect(posts).toHaveLength(2);
  });

  it('shoud get all posts ordered by reads in asc direction', async () => {
    jest
      .spyOn(postsService, 'queryPostsByTag')
      .mockImplementation(async () => postsData);
    const posts = await controller.queryPostsByTag(
      'culture,history,health',
      'reads',
      null,
    );
    expect(postsService.queryPostsByTag).toBeCalledTimes(1);

    expect(posts).toHaveLength(3);
    expect(posts[0].id).toEqual(1);
    expect(posts[1].id).toEqual(2);
    expect(posts[2].id).toEqual(3);
  });

  it('shoud get all posts ordered by reads in desc direction', async () => {
    jest
      .spyOn(postsService, 'queryPostsByTag')
      .mockImplementation(async () => postsData.reverse());
    const posts = await controller.queryPostsByTag(
      'culture,history, health',
      'reads',
      'desc',
    );

    expect(postsService.queryPostsByTag).toBeCalledTimes(1);

    expect(posts).toHaveLength(3);
    expect(posts[0].id).toEqual(3);
    expect(posts[1].id).toEqual(2);
    expect(posts[2].id).toEqual(1);
  });
});
