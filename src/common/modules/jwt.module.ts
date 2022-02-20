import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secretOrKeyProvider: () => configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '300s',
          },
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
  ],
  exports: [JwtModule],
})
export class JWTModule {}
