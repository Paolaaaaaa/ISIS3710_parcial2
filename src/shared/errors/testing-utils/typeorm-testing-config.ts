/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from '../../../entities/foto/foto.entity';
import { UsuarioEntity } from '../../../entities/usuario/usuario.entity';
import { AlbumEntity } from '../../../entities/album/album.entity';
import { RedSocialEntity } from '../../..//entities/redSocial/redSocial.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [FotoEntity,UsuarioEntity, AlbumEntity,RedSocialEntity],
    synchronize: true,
    keepConnectionAlive: true 
  }),
  TypeOrmModule.forFeature([FotoEntity, UsuarioEntity, AlbumEntity, RedSocialEntity]),
];
