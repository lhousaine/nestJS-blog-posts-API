import { Injectable } from '@nestjs/common';
import { PostResponseDto } from 'src/modules/posts/dto/post.reponse.dto';
import { ICustomFilterService } from './icumstomFilter.service';

@Injectable()
export class CustomFilterService implements ICustomFilterService {
  removeDuplicateFromArray(
    array: PostResponseDto[],
    field: string,
  ): PostResponseDto[] {
    const mySet = new Set();
    return array.filter(
      (current) => !mySet.has(current[field]) && mySet.add(current[field]),
    );
  }
}
