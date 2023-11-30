import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';

@Entity()
export class FotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  velObturacion: number;
  @Column()
  apertura: number;
  @Column()
  fecha: string;
  @Column()
  iso: number;
  @ManyToOne(() => UsuarioEntity, (user) => user.fotos)
  usuario: UsuarioEntity;
  @ManyToOne(() => AlbumEntity, (album) => album.fotos)
  album: AlbumEntity;
}
