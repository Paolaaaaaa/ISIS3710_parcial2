import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , OneToMany} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class RedSocialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  slogan: string;
 
  @OneToMany(()=> FotoEntity, (foto)=> foto.redesociales)
  fotos: FotoEntity[];

  @OneToMany(()=> )
  usuarios: UsuarioEntity[];
}
