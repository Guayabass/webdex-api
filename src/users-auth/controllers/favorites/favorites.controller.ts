import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateFavoriteDto } from 'src/users-auth/dto/CreateFavorite.dto';
import { FavoritesService } from 'src/users-auth/services/favorites/favorites.service';

@Controller('favorites')
export class FavoritesController {

constructor(private favService: FavoritesService){

}

@Post()
addFavorite(@Body() favDTO : CreateFavoriteDto){
 return this.favService.addFavorite(favDTO);
}

@Get(':id')
findAll(@Param('id', ParseIntPipe) id: number){
    return this.favService.findAll(id)
}

@Delete(':id')
deleteFavorite(@Param('id', ParseIntPipe) id: number){
    return this.favService.deleteFavorite(id)
}

@Get(':id/:pokemonid')
getUsersFavorites(@Param('id', ParseIntPipe) id: number, @Param('pokemonid', ParseIntPipe) pokemonid: number){
    return this.favService.getUsersFavorites(id, pokemonid)
}
//HACER METODO PARA GET ID DE FAVORITES

}
