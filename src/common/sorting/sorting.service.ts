import { Injectable } from '@nestjs/common';
import { PostResponseDto } from 'src/modules/posts/dto/post.reponse.dto';

@Injectable()
export class SortingService {
  sortArray(
    array: PostResponseDto[],
    sortBy: string,
    direction: string,
  ): PostResponseDto[] {
    if (!sortBy) {
      sortBy = 'id';
    }

    if (direction && direction === 'desc') {
      array.sort((current, next) => next[sortBy] - current[sortBy]);
    } else {
      array.sort((current, next) => current[sortBy] - next[sortBy]);
    }
    return array;
  }
}
