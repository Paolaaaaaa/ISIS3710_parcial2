import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [],
})
export class AlbumModule {}
