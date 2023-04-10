import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users-auth/dto/CreateUser.dto';
import { LoginUser } from 'src/users-auth/dto/LoginUser.dto';
// import { UpdateUserDto } from 'src/users-auth/dto/UpdateUser.dto';
import { UserNotFoundException } from 'src/users-auth/exceptions/UserNotFound.exception';
import { UsersAuthService } from 'src/users-auth/services/users-auth/users-auth.service';
import { SerializedUser } from 'src/users-auth/types';

@Controller('authuser')
export class UsersAuthController {

    constructor(@Inject('USER_AUTH_SERVICE') private readonly userService: UsersAuthService){

    }

    @UseInterceptors(ClassSerializerInterceptor)//para poder serializar bien
    @Get('')
    getUsers(){
        return this.userService.getUsersAuth();
    }

    @UseInterceptors(ClassSerializerInterceptor)//para poder serializar bien
    @Get('/username/:username')
    getUsersByUsername(@Param('username') username: string){
        const user = this.userService.findUserByUsername(username);

        if (!user) throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
        else return user;
        //return new SerializedUser(user);
    
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/id/:id')
    getUsersById(@Param('id', ParseIntPipe) id: number){
        const user = this.userService.findUserById(id);

        if (!user) throw new UserNotFoundException();
        else return user;
        //return new SerializedUser(user);
        // or use NotFoundException();
        //else throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUser: LoginUser){ //the same dto as createUser but for a easier understanding.
        return this.userService.loginUser(loginUser.username, loginUser.password)
    }

    // @Patch(':id')
    // updateUser(@Param('id', ParseIntPipe) id: number, @Body() favoriteId: UpdateUserDto){
    //     return this.userService.updateUser(id, favoriteId)
    // }
}
