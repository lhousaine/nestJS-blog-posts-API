import { CacheModule, Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { PingModule } from './modules/ping/ping.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    PostsModule,
    PingModule,
    CommonModule,
    CacheModule.register({
      ttl: 0,
      isGlobal: true,
    }),
  ],
  exports: [CacheModule],
})
export class AppModule {}
