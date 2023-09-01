import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Favorite } from 'src/typeorm/Favorite';
import { CreateFavoriteDto } from 'src/users-auth/dto/CreateFavorite.dto';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async addFavorite(favDTO: CreateFavoriteDto) {
    const id = favDTO.user;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const newFavorite = new Favorite();
    newFavorite.user = user;
    newFavorite.pokemonID = favDTO.pokemonID;
    newFavorite.pokemonName = favDTO.pokemonName;
    const existsFav = this.getUsersFavorites(favDTO.user, favDTO.pokemonID)
    console.log(existsFav)
    if (existsFav){//llamar getUsersFavorites
      return new HttpException('User/Pokemon already exists', HttpStatus.CONFLICT);
    }
    return this.favoriteRepository.save(newFavorite);
  }

  async deleteFavorite(id: number) {
    const result = await this.favoriteRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  findAll(id: number) {
    return this.favoriteRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: id,
        },
      },
    });
  }

  getUsersFavorites(id: number, pokemonid: number) {
    return this.favoriteRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: id,
        },
        pokemonID: pokemonid
      },
    });
  }
}
