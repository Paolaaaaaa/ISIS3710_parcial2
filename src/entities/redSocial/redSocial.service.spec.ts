import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { TypeOrmTestingConfig } from '../../shared/errors/testing-utils/typeorm-testing-config';
import { RedSocialEntity } from './redSocial.entity';
import { RedSocialService } from './redSocial.service';

describe('RedSocialService', () => {
  let service: RedSocialService;
  let repository: Repository<RedSocialEntity>;
  let redSocial_list: RedSocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
    repository = module.get<Repository<RedSocialEntity>>(
      getRepositoryToken(RedSocialEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    redSocial_list = [];

    for (let i = 0; i < 5; i++) {
      const redSocial: RedSocialEntity = await repository.save({
        nombre: faker.internet.domainName(),
        slogan: faker.company.buzzPhrase(),
        usuarios: [],
      });
      redSocial_list.push(redSocial);
    }
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should create a new redSocial', async () => {
    const redSocial: RedSocialEntity = {
      nombre: faker.internet.domainName(),
      slogan: faker.lorem.sentence(10),
      usuarios: [],
      id: '',
    };

    const newredSocial: RedSocialEntity = await service.create(redSocial);
    expect(newredSocial).not.toBeNull();

    const stored_redSocial: RedSocialEntity = await repository.findOne({
      where: { id: newredSocial.id },
    });
    expect(stored_redSocial).not.toBeNull();
    expect(redSocial).not.toBeNull();
    expect(redSocial.nombre).toEqual(stored_redSocial.nombre);
    expect(redSocial.slogan).toEqual(stored_redSocial.slogan);
  });

  it('create should throw an error if title is less than 20 char', async () => {
    const redSocial: RedSocialEntity = {
      nombre: faker.internet.domainName(),
      slogan: '7 letras',
      usuarios: [],
      id: '',
    };
    await expect(() => service.create(redSocial)).rejects.toHaveProperty(
      'message',
      'Red social slogan is not valid',
    );
  });



  it('create should throw an error if slogan is empty', async () => {
    const redSocial: RedSocialEntity = {
      nombre: faker.internet.domainName(),
      slogan: '',
      usuarios: [],
      id: '',
    };
    await expect(() => service.create(redSocial)).rejects.toHaveProperty(
      'message',
      'Red social slogan is not valid',
    );
  });


});
