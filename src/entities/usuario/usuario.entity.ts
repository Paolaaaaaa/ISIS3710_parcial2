import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  telefono: number;
  @OneToMany(() => FotoEntity, (foto) => foto.user)
  fotos: UsuarioEntity[];
}
