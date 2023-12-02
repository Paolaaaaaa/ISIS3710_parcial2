import { IsString, IsNotEmpty, isNumber } from 'class-validator';

export class UsuarioDTO {


  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  @IsString()
  @IsNotEmpty()
  readonly telefono: string;


}