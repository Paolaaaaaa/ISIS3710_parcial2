/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Param, Get, Body,Post, NotFoundException } from "@nestjs/common";
import { BusinessErrorsInterceptor } from "../../shared/interceptors/business-errors.interceptors";
import { plainToInstance } from 'class-transformer';
import { UsuarioService } from "./usuario.service";
import { UsuarioDTO } from "./UsuarioDTO";
import { UsuarioEntity } from "./usuario.entity";

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService){}
    

    @Get(':usuarioId/')
    async findUsuario(@Param('usuarioId') usuarioId:string){
        if (!usuarioId) {
            throw new NotFoundException('ID cannot be empty');
          }
        return await this.usuarioService.findOne(usuarioId);
    }

    @Get('/')
    async findUsers(){
        return await this.usuarioService.findAll();
    }

    @Post('/')
   async createUsuario(@Body() usuarioDTO: UsuarioDTO){
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDTO);

       return await this.usuarioService.create(usuario);
   }





}




  