import { IsEmail, IsNotEmpty, MinLength } from "class-validator"; //the same dto as createUser but for a easier understanding.

export class LoginUser{
    @IsNotEmpty()
    @MinLength(3)
    @IsEmail()
    username: string;
    @IsNotEmpty()
    @MinLength(5)
    password: string;
}