import { Injectable } from '@nestjs/common';
import { PostResponseDto } from 'src/modules/posts/dto/post.reponse.dto';

@Injectable()
export abstract class ICustomFilterService {
  abstract removeDuplicateFromArray(
    array: PostResponseDto[],
    field: string,
  ): PostResponseDto[];
}
