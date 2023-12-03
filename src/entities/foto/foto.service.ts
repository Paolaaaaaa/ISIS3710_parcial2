import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../../shared/errors/business-errors';
import { FotoEntity } from './foto.entity';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
  ) {}

  async create(foto: FotoEntity): Promise<FotoEntity> {
    if (foto.iso > 6400 || foto.iso < 100) {
      throw new BusinessLogicException(
        'The foto iso is not valid',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    if (foto.velObturacion > 250 || foto.velObturacion < 2) {
      throw new BusinessLogicException(
        'The foto Obturacion is not valid',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    if (foto.apertura > 32 || foto.apertura < 1) {
      throw new BusinessLogicException(
        'The foto apertura is not valid',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.fotoRepository.save(foto);
  }

  async findAll(): Promise<FotoEntity[]> {
    return await this.fotoRepository.find();
  }

  async findOne(id: string): Promise<FotoEntity> {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id: id },
    });
    if (!foto)
      throw new BusinessLogicException(
        'The foto with given id was not found',
        BusinessError.NOT_FOUND,
      );
    return foto;
  }

 
  async delete(id: string): Promise<void> {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id: id },
    });
    if (!foto)
      throw new BusinessLogicException(
        'The foto with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.fotoRepository.remove(foto);
  }
}
