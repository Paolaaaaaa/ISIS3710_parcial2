/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Param, Get, Body,Post } from "@nestjs/common";
import { BusinessErrorsInterceptor } from "../../shared/interceptors/business-errors.interceptors";
import { plainToInstance } from 'class-transformer';
import { RedSocialService } from "./redSocial.service";
import { RedSocialDTO } from "./redSocialDTO";
import { RedSocialEntity } from "./redSocial.entity";


@Controller('redesSociales')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedSocialController{
    constructor(private readonly redSocialService: RedSocialService){}
    



    @Post('/')
   async createRedSocial(@Body() redSocialDTO: RedSocialDTO){
        const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDTO);

       return await this.redSocialService.create(redSocial);
   }





}
