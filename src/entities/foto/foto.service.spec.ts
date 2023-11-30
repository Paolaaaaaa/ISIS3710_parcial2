import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { TypeOrmTestingConfig } from '../../shared/errors/testing-utils/typeorm-testing-config';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let foto_list: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    foto_list = [];

    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        apertura: faker.number.int({ min: 1, max: 32 }),
        velObturacion: faker.number.int({ min: 2, max: 250 }),
        iso: faker.number.int({ min: 100, max: 6400 }),
        fecha: faker.date.anytime().toISOString(),
      });
      foto_list.push(foto);
    }
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all institutions', async () => {
    const foto_list: FotoEntity[] = await service.findAll();
    expect(foto_list).not.toBeNull();
    expect(foto_list).toHaveLength(foto_list.length);
  });

  it('findOne should return a foto by id', async () => {
    const stored_foto: FotoEntity = foto_list[0];
    const foto: FotoEntity = await service.findOne(stored_foto.id);
    expect(foto).not.toBeNull();
    expect(foto.apertura).toEqual(stored_foto.apertura);
    expect(foto.iso).toEqual(stored_foto.iso);
    expect(foto.fecha).toEqual(stored_foto.fecha);
    expect(foto.velObturacion).toEqual(stored_foto.velObturacion);
  });

  it('findOne should throw an error if foto does not exist', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The foto with given name was not found',
    );
  });

  it('create should create a new foto', async () => {
    const foto: FotoEntity = {
      apertura: faker.number.int({ min: 1, max: 32 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      iso: faker.number.int({ min: 100, max: 6400 }),
      fecha: faker.date.anytime().toISOString(),
      id: '',
    };

    const newfoto: FotoEntity = await service.create(foto);
    expect(newfoto).not.toBeNull();

    const stored_foto: FotoEntity = await repository.findOne({
      where: { id: newfoto.id },
    });
    expect(stored_foto).not.toBeNull();
    expect(foto).not.toBeNull();
    expect(foto.apertura).toEqual(stored_foto.apertura);
    expect(foto.iso).toEqual(stored_foto.iso);
    expect(foto.fecha).toEqual(stored_foto.fecha);
    expect(foto.velObturacion).toEqual(stored_foto.velObturacion);
  });

  it('create should throw an error if foto date is in the future', async () => {
    const foto: FotoEntity = {
      apertura: 0,
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      iso: faker.number.int({ min: 100, max: 6400 }),
      fecha: faker.date.anytime().toISOString(),
      id: '',
    };
    await expect(() => service.create(foto)).rejects.toHaveProperty(
      'message',
      'The foto apertura is not valid',
    );
  });


  it('delete should delete an existing foto', async () => {
    const foto: FotoEntity = foto_list[0];
    await service.delete(foto.id);
    const delFoto: FotoEntity = await repository.findOne({
      where: { id: foto.id },
    });
    expect(delFoto).toBeNull();
  });

  it('delete should throw an error if foto does not exist', async () => {
    await expect(() => service.delete('0')).rejects.toThrowError();
  });

});
