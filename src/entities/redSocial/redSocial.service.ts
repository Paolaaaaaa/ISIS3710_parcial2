import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../../shared/errors/business-errors';
import { RedSocialEntity } from './redSocial.entity';
@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocialEntity)
    private readonly redSocialRepository: Repository<RedSocialEntity>,
  ) {}

  async create(redSocial: RedSocialEntity): Promise<RedSocialEntity> {
    if (!redSocial.slogan || redSocial.slogan.length < 20) {
      throw new BusinessLogicException(
        'Red social slogan is not valid',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.redSocialRepository.save(redSocial);
  }
}
