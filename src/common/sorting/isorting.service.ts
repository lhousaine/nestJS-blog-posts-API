import { Injectable } from '@nestjs/common';
import { PostResponseDto } from 'src/modules/posts/dto/post.reponse.dto';

@Injectable()
export abstract class ISortingService {
  abstract sortArray(
    array: PostResponseDto[],
    sortBy: string,
    direction: string,
  ): PostResponseDto[];
}
