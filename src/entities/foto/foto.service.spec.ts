import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { TypeOrmTestingConfig } from '../../shared/errors/testing-utils/typeorm-testing-config';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';
describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let foto_list: FotoEntity[];
  let repository_usuario: Repository<UsuarioEntity>;
  let repository_album: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);

    repository_album = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );

    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );

    repository_usuario = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    foto_list = [];

    for (let i = 0; i < 5; i++) {
      const user: UsuarioEntity = await repository_usuario.save({
        nombre: faker.internet.userName(),
        telefono: faker.phone.number(),
        fotos: [],
        albunes: [],
      });
  
      const album: AlbumEntity = await repository_album.save({
        titulo: faker.internet.domainName(),
        fechaInicio: faker.date.anytime().toISOString(),
        fechaFin: faker.date.anytime().toISOString(),
        fotos: [],
        usuario: user,
        id:''
      });
      const foto: FotoEntity = await repository.save({
        apertura: faker.number.int({ min: 1, max: 32 }),
        velObturacion: faker.number.int({ min: 2, max: 250 }),
        iso: faker.number.int({ min: 100, max: 6400 }),
        fecha: faker.date.anytime().toISOString(),
        usuario: user,
        album: album,
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
    expect(stored_foto).not.toBeNull();
    expect(foto).not.toBeNull();
    expect(foto.apertura).toEqual(stored_foto.apertura);
    expect(foto.iso).toEqual(stored_foto.iso);
    expect(foto.fecha).toEqual(stored_foto.fecha);
    expect(foto.velObturacion).toEqual(stored_foto.velObturacion);
  });

  it('findOne should throw an error if foto does not exist', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The foto with given id was not found',
    );
  });

  it('create should create a new foto', async () => {
    const user: UsuarioEntity = await repository_usuario.save({
      nombre: faker.internet.userName(),
      telefono: faker.phone.number(),
      fotos: [],
      albunes: [],
    });

    const album: AlbumEntity = await repository_album.save({
      titulo: faker.internet.domainName(),
      fechaInicio: faker.date.anytime().toISOString(),
      fechaFin: faker.date.anytime().toISOString(),
      fotos: [],
      usuario: user,
      id:''
    });
    const foto: FotoEntity = {
      apertura: faker.number.int({ min: 1, max: 32 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      iso: faker.number.int({ min: 100, max: 6400 }),
      fecha: faker.date.anytime().toISOString(),
      id: '',
      usuario: user,
      album: album,
    };

    const newfoto: FotoEntity = await service.create(foto);
    expect(newfoto).not.toBeNull();

    const stored_foto: FotoEntity = await repository.findOne({
      where: { id: newfoto.id },
    });
    expect(stored_foto).not.toBeNull();
    expect(foto).not.toBeNull();
    expect(newfoto.apertura).toEqual(stored_foto.apertura);
    expect(newfoto.iso).toEqual(stored_foto.iso);
    expect(newfoto.fecha).toEqual(stored_foto.fecha);
    expect(newfoto.velObturacion).toEqual(stored_foto.velObturacion);
  });

  it('create should throw an error if foto date is in the future', async () => {
    repository_usuario;
    const foto: FotoEntity = {
      apertura: 0,
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      iso: faker.number.int({ min: 100, max: 6400 }),
      fecha: faker.date.anytime().toISOString(),
      id: '',
      usuario: new UsuarioEntity(),
      album: new AlbumEntity(),
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
    await expect(() => service.delete('-1')).rejects.toHaveProperty(
      'message',
      'The foto with the given id was not found',
    );
  });
});
