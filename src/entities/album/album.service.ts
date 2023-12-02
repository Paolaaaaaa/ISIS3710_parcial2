import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../../shared/errors/business-errors';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
  ) {}

  async create(album: AlbumEntity): Promise<AlbumEntity> {
    if (!album.titulo) {
      throw new BusinessLogicException(
        'The album title is not valid',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.albumRepository.save(album);
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id: id },
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with given id was not found',
        BusinessError.NOT_FOUND,
      );
    return album;
  }

  async addPhotoToAlbum(
    foto: FotoEntity,
    albumid: string,
  ): Promise<AlbumEntity> {
    const new_foto: FotoEntity = await this.fotoRepository.save(foto);
    if (!new_foto)
      throw new BusinessLogicException(
        'The foto is not valid ',
        BusinessError.BAD_REQUEST,
      );

    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id: albumid },
      relations: ['fotos'],
    });
    if (!album) {
      throw new BusinessLogicException(
        'The album  id is not valid',
        BusinessError.NOT_FOUND,
      );
    }
    album.fotos.push(new_foto);
    new_foto.album = album;
    await this.fotoRepository.save(new_foto);

    return await this.albumRepository.save(album);
  }

  async delete(id: string): Promise<void> {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id: id },
      relations: ['fotos'],
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    if (!album.fotos || album.fotos.length !== 0)
      throw new BusinessLogicException(
        'The album with fotos cant be deleted',
        BusinessError.NOT_FOUND,
      );

    await this.albumRepository.remove(album);
  }
}
