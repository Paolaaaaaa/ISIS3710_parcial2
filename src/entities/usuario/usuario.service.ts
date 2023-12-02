import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../../shared/errors/business-errors';
import { UsuarioEntity } from './usuario.entity';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    if (usuario.telefono.length !== 10) {
      throw new BusinessLogicException(
        'The usuario number is not valid',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: string): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id: id },
    });
    if (!usuario)
      throw new BusinessLogicException(
        'The usuario with given id was not found',
        BusinessError.NOT_FOUND,
      );
    return usuario;
  }


}
