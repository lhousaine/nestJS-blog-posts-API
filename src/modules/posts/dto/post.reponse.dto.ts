import { User } from './../../user/user.entity';
export class PostResponseDto {
  id: number;
  likes: number;
  popularity: number;
  reads: number;
  tags: string[];
  author: User;
}
