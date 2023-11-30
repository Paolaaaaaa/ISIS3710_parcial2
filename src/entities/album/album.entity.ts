import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class AlbumEntity {
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
}
