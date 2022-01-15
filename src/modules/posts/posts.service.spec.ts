import { HttpModule, HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomFilterService } from '../../common/filters/customFilter.service';
import { ICustomFilterService } from '../../common/filters/icumstomFilter.service';
import { ISortingService } from '../../common/sorting/isorting.service';
import { SortingService } from '../../common/sorting/sorting.service';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let sortingService: ISortingService;
  let customFilterService: ICustomFilterService;
  let httpService: HttpService;

  const postsData = [
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
      imports: [HttpModule],
      providers: [
        PostsService,
        {
          provide: ISortingService,
          useClass: SortingService,
        },
        {
          provide: ICustomFilterService,
          useClass: CustomFilterService,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    sortingService = module.get<ISortingService>(ISortingService);
    customFilterService =
      module.get<ICustomFilterService>(ICustomFilterService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException exception in case params are not valid', async () => {
    await expect(
      service.queryPosts({ tags: '', sortBy: null, direction: null }),
    ).rejects.toThrowError(BadRequestException);
  });

  it('shoud get posts with tags contains culture and history', async () => {
    jest
      .spyOn(customFilterService, 'removeDuplicateFromArray')
      .mockImplementation(() => postsData.slice(1, 3));
    jest
      .spyOn(sortingService, 'sortArray')
      .mockImplementation(() => postsData.slice(1, 3));

    const { posts } = await service.queryPosts({
      tags: 'culture,history',
      sortBy: null,
      direction: null,
    });

    expect(customFilterService.removeDuplicateFromArray).toBeCalledTimes(1);
    expect(sortingService.sortArray).toBeCalledTimes(1);

    expect(posts).toHaveLength(2);
  });

  it('shoud get posts with tags contains culture and history', async () => {
    jest
      .spyOn(customFilterService, 'removeDuplicateFromArray')
      .mockImplementation(() => postsData.slice(1, 3));
    jest
      .spyOn(sortingService, 'sortArray')
      .mockImplementation(() => postsData.slice(1, 3).reverse());

    const { posts } = await service.queryPosts({
      tags: 'culture,history',
      sortBy: 'reads',
      direction: 'desc',
    });

    expect(customFilterService.removeDuplicateFromArray).toBeCalledTimes(1);
    expect(sortingService.sortArray).toBeCalledTimes(1);

    expect(posts).toHaveLength(2);
  });
});
