import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFavoriteDto{
    @IsNotEmpty()
    @IsNumber()
    pokemonID: number;
    @IsNotEmpty()
    @IsString()
    pokemonName: string;
    @IsNotEmpty()
    @IsNumber()
    user: number;
}