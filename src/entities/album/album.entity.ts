import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fechaInicio: string;
  @Column()
  fechaFin: string;
  @Column()
  titulo:string;
  @ManyToOne(() => UsuarioEntity, (user) => user.albunes)
  usuario: UsuarioEntity;
  @OneToMany(() => FotoEntity, (foto) => foto.album)
  fotos: FotoEntity[];
}
