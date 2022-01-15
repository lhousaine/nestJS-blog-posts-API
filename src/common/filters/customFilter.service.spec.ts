import { Test, TestingModule } from '@nestjs/testing';
import { CustomFilterService } from './customFilter.service';
import { ICustomFilterService } from './icumstomFilter.service';

describe('CustomFilterService', () => {
  let service: ICustomFilterService;
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
      tags: ['health', 'history'],
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 3,
      likes: 735,
      popularity: 0.76,
      reads: 1004,
      tags: ['health', 'history'],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ICustomFilterService,
          useClass: CustomFilterService,
        },
      ],
    }).compile();

    service = module.get<ICustomFilterService>(ICustomFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shoud remove duplicate elements from the array', async () => {
    const posts = service.removeDuplicateFromArray(postsData, 'id');
    expect(posts).toHaveLength(3);
  });
});
