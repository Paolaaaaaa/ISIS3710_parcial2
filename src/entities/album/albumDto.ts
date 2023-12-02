import { IsString, IsNotEmpty } from 'class-validator';

export class AlbumDTO {
  @IsString()
  @IsNotEmpty()
  readonly fechaInicio: string;

  @IsString()
  @IsNotEmpty()
  readonly fechaFin: string;


  @IsString()
  @IsNotEmpty()
  readonly titulo: string;


}