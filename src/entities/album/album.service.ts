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
export class FotoService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
  ) {}

  async create(album: AlbumEntity): Promise<AlbumEntity> {
    if (!album.titulo) {
      throw new BusinessLogicException(
        'The album iso is not valid',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    
    return await this.albumRepository.save(album);}
  

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
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


  async addDonationInstitution(
    foto: FotoEntity
    albumid,
  ): Promise<Record<string, any>> {
    const new_foto: FotoEntity =
      await this.fotoRepository.save(foto);
    if (!new_foto)
      throw new BusinessLogicException(
        'The foto has a error',
        BusinessError.NOT_FOUND,
      );
      return new_foto
    
  }




 
  async delete(id: string): Promise<void> {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id: id },
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.albumRepository.remove(album);
  }
}
