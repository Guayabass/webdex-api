import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @MinLength(3)
    @IsEmail()
    username: string;
    @IsNotEmpty()
    @MinLength(5)
    password: string;
}