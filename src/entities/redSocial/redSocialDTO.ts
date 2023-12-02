import { IsString, IsNotEmpty, isNumber } from 'class-validator';

export class RedSocialDTO {


  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  @IsString()
  @IsNotEmpty()
  readonly slogan: string;


}