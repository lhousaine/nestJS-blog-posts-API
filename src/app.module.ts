import { UsersModule } from './modules/user/user.module';
import { CacheModule, Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { PingModule } from './modules/ping/ping.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    PostsModule,
    PingModule,
    UsersModule,
    CommonModule,
    CacheModule.register({
      ttl: 0,
      isGlobal: true,
    }),
  ],
  exports: [CacheModule],
})
export class AppModule {}
