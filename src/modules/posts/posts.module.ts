import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from '../../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 60000,
        maxRedirects: 5,
      }),
    }),
    CommonModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
