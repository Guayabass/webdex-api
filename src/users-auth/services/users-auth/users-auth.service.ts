import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDto } from 'src/users-auth/dto/CreateUser.dto';
import { SerializedUser, UserAuth } from 'src/users-auth/types/index';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UsersAuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private usersAuth: UserAuth[] = [];

  getUsersAuth() {
    return this.usersAuth.map((user) => new SerializedUser(user)); //for it to call the class that is serialized instead of the interface (plainToInstance method)
  }

  getUserByUsername(username: string) {
    return this.usersAuth.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.usersAuth.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    console.log(password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    /**const favoritesIds = createUserDto.favoritesIds;
    const favorites = await this.favRepository.findBy({ id: In([favoritesIds]) });
    newUser.favorites = favorites; COPY DOWN THERE IN UPDATEUSER*/ 
    return this.userRepository.save(newUser);
  }

  // async updateUser( id: number, updateUserDto: UpdateUserDto){
  //   const userFound = await this.userRepository.findOne({
  //       where: {
  //         id: id,
  //       },
  //     });
  
  //     if (!userFound) {
  //       return new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }
  //     const updatedUser = Object.assign(userFound, updateUserDto);
  
  //     return this.userRepository.save(updatedUser);
  // }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async loginUser(username: string, password: string){
    const userDB = await this.findUserByUsername(username)

    if (userDB){
        const matched = comparePasswords(password, userDB.password);
        if (matched){
            console.log('Validation Succesful')
            return userDB;
        } else {
            console.log('Wrong Password');
            return null;
        }

    }
    console.log('Validation failed')
    return null;
  }
}
