import { Module } from '@nestjs/common';
import { UsersAuthModule } from './users-auth/users-auth.module';
import entities from './typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [UsersAuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'na02-db.cus.mc-panel.net',
    port: 3306,
    username: 'db_327362',
    password: 'ce0a4e1f47',
    database: 'db_327362',
    entities,
    synchronize: true
  }), ThrottlerModule.forRoot({
    ttl: 5,
    limit: 1,
  })],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}