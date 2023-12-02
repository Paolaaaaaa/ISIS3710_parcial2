import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { FotoEntity } from '../foto/foto.entity';
import { AlbumEntity } from '../album/album.entity';
import { RedSocialEntity } from '../redSocial/redSocial.entity';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  telefono: string;
  @OneToMany(() => FotoEntity, (foto) => foto.usuario)
  fotos: FotoEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.usuario)
  albunes: AlbumEntity[];

  @ManyToOne(() => RedSocialEntity, (red) => red.usuarios)
  redsocial: RedSocialEntity;
}
