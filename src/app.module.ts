import { Module } from '@nestjs/common';
import { UsersAuthModule } from './users-auth/users-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Favorite, User } from './typeorm';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UsersAuthModule, TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USER'),
      password: configService.get<string>('DATABASE_PASS'),
      database: configService.get<string>('DATABASE_NAME'),
      entities: [Favorite, User],
      synchronize: true,
    })
  }), ThrottlerModule.forRoot({
    ttl: 1,
    limit: 1,
  })],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}