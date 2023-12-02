/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Param, Get, Put, Body,Post,HttpCode,Delete, UseGuards } from "@nestjs/common";
import { BusinessErrorsInterceptor } from "src/shared/interceptors/business-errors.interceptors";
import { AlbumService } from "./album.service";
import { AlbumDTO } from "./albumDto";
import { AlbumEntity } from "./album.entity";
import { plainToInstance } from 'class-transformer';
import { FotoDTO } from "./fotoDTO";
import { FotoEntity } from "../foto/foto.entity";

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController{
    constructor(private readonly albumService: AlbumService){}
    

    @Get('/:albumId/')
    async findAlbum(@Param('albumId') albumId:string){
        return await this.albumService.findOne(albumId);
    }

    @Post('/')
   async createAlbum(@Body() albumDTO: AlbumDTO){
        const album: AlbumEntity = plainToInstance(AlbumEntity, albumDTO);

       return await this.albumService.create(album);
   }

   @Put(':albumId/foto')
   async addPhotoToAlbum (@Body() fotoDTO: FotoDTO, @Param('albumId') albumId: string){
       const foto = plainToInstance(FotoEntity, fotoDTO)
       return await this.albumService.addPhotoToAlbum(foto, albumId);
   }

   @Delete(':albumId')
   @HttpCode(204)
   async deleteAlbum(@Param('albumId') albumId: string){
       return await this.albumService.delete(albumId);
   }




}




  