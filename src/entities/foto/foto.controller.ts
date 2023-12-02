/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Param, Get, Body,Post, Delete } from "@nestjs/common";
import { BusinessErrorsInterceptor } from "../../shared/interceptors/business-errors.interceptors";
import { plainToInstance } from 'class-transformer';
import { FotoService } from "./foto.service";
import { FotoDTO } from "../album/fotoDTO";
import { FotoEntity } from "./foto.entity";


@Controller('fotos')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController{
    constructor(private readonly fotoService: FotoService){}
    

    @Get(':fotoId/')
    async findFoto(@Param('fotoId') fotoId:string){
        return await this.fotoService.findOne(fotoId);
    }

    @Get('/')
    async findFotos(){
        return await this.fotoService.findAll();
    }

    @Post('/')
   async createFoto(@Body() fotoDTO: FotoDTO){
        const foto: FotoEntity = plainToInstance(FotoEntity, fotoDTO);

       return await this.fotoService.create(foto);
   }

   @Delete(":fotoId")
   async delete(@Param('fotoId') fotoId: string){
    return await this.fotoService.delete(fotoId);
   }





}




  