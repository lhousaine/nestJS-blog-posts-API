import { Test, TestingModule } from '@nestjs/testing';
import { ISortingService } from './isorting.service';
import { SortingService } from './sorting.service';

describe('SortingService', () => {
  let service: ISortingService;
  const postsData = [
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 2,
      likes: 735,
      popularity: 0.76,
      reads: 1532,
      tags: ['culture', 'science'],
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
      id: 3,
      likes: 500,
      popularity: 0.76,
      reads: 1004,
      tags: ['health', 'history'],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ISortingService,
          useClass: SortingService,
        },
      ],
    }).compile();

    service = module.get<ISortingService>(ISortingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shoud sort the posts array in descending order by id', async () => {
    const posts = service.sortArray(postsData, null, null);
    expect(posts).toHaveLength(3);
    expect(posts[0].id).toEqual(1);
    expect(posts[1].id).toEqual(2);
    expect(posts[2].id).toEqual(3);
  });

  it('shoud sort the posts array in ascending order by reads', async () => {
    const posts = service.sortArray(postsData, 'reads', 'asc');
    expect(posts).toHaveLength(3);
    expect(posts[1].id).toEqual(3);
    expect(posts[2].id).toEqual(2);
  });

  it('shoud sort the array in descending order by field', async () => {
    const posts = service.sortArray(postsData, 'likes', 'desc');
    expect(posts).toHaveLength(3);
    expect(posts[0].id).toEqual(2);
    expect(posts[1].id).toEqual(3);
    expect(posts[2].id).toEqual(1);
  });
});
