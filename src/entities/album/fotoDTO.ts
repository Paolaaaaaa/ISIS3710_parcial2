import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class FotoDTO {

  @IsNumber()
  @IsNotEmpty()
  readonly velObturacion: number;


  @IsNumber()
  @IsNotEmpty()
  readonly apertura: number;


  @IsNumber()
  @IsNotEmpty()
  readonly iso: number;

  @IsString()
  @IsNotEmpty()
  readonly fecha: string;


}