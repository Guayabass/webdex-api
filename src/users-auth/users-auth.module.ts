import { Module } from '@nestjs/common';
import { UsersAuthService } from './services/users-auth/users-auth.service';
import { UsersAuthController } from './controllers/users-auth/users-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Favorite } from 'src/typeorm/Favorite';
import { FavoritesService } from './services/favorites/favorites.service';
import { FavoritesController } from './controllers/favorites/favorites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Favorite])],
  controllers: [UsersAuthController, FavoritesController],
  providers: [{
    provide: 'USER_AUTH_SERVICE',
    useClass: UsersAuthService
  }, FavoritesService]
})
export class UsersAuthModule {}
