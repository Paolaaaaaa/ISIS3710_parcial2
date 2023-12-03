import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { TypeOrmTestingConfig } from '../../shared/errors/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { FotoEntity } from '../foto/foto.entity';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let album_list: AlbumEntity[];
  let repository_usuario: Repository<UsuarioEntity>;
  let repository_foto: Repository<FotoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );

    repository_usuario = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );

    repository_foto = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    album_list = [];

    const user: UsuarioEntity = await repository_usuario.save({
      nombre: faker.internet.userName(),
      telefono: faker.phone.number(),
      fotos: [],
      albunes: [],
    });

    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        titulo: faker.internet.domainName(),
        fechaInicio: faker.date.anytime().toISOString(),
        fechaFin: faker.date.anytime().toISOString(),
        fotos: [],
        usuario: user,
      });
      album_list.push(album);
    }
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return a album by id', async () => {
    const stored_album: AlbumEntity = album_list[0];
    const album: AlbumEntity = await service.findOne(stored_album.id);
    expect(album).not.toBeNull();
    expect(album.fechaFin).toEqual(stored_album.fechaFin);
    expect(album.fechaInicio).toEqual(stored_album.fechaInicio);
    expect(album.titulo).toEqual(stored_album.titulo);
  });

  it('findOne should throw an error if album does not exist', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The album with given id was not found',
    );
  });

  it('create should create a new album', async () => {
    const user: UsuarioEntity = await repository_usuario.save({
      nombre: faker.internet.userName(),
      telefono: faker.phone.number(),
      fotos: [],
      albunes: [],
    });
    const album: AlbumEntity = {
      titulo: faker.internet.domainName(),
      fechaInicio: faker.date.anytime().toISOString(),
      fechaFin: faker.date.anytime().toISOString(),
      id: '',
      usuario: user,
      fotos: [],
    };

    const newalbum: AlbumEntity = await service.create(album);
    expect(newalbum).not.toBeNull();

    const stored_album: AlbumEntity = await repository.findOne({
      where: { id: newalbum.id },
    });
    expect(stored_album).not.toBeNull();
    expect(album).not.toBeNull();
    expect(album.fechaFin).toEqual(stored_album.fechaFin);
    expect(album.fechaInicio).toEqual(stored_album.fechaInicio);
    expect(album.titulo).toEqual(stored_album.titulo);
  });

  it('create should throw an error if title is empty', async () => {
    const user: UsuarioEntity = await repository_usuario.save({
      nombre: faker.internet.userName(),
      telefono: faker.phone.number(),
      fotos: [],
      albunes: [],
    });
    const album: AlbumEntity = {
      titulo: '',
      fechaInicio: faker.date.anytime().toISOString(),
      fechaFin: faker.date.anytime().toISOString(),
      id: '',
      usuario: user,
      fotos: [],
    };
    await expect(() => service.create(album)).rejects.toHaveProperty(
      'message',
      'The album title is not valid',
    );
  });

  it('create should throw an error if title is empty', async () => {
    const user: UsuarioEntity = await repository_usuario.save({
      nombre: faker.internet.userName(),
      telefono: faker.phone.number(),
      fotos: [],
      albunes: [],
    });
    const album: AlbumEntity = {
      titulo: '',
      fechaInicio: faker.date.anytime().toISOString(),
      fechaFin: faker.date.anytime().toISOString(),
      id: '',
      usuario: user,
      fotos: [],
    };
    await expect(() => service.create(album)).rejects.toHaveProperty(
      'message',
      'The album title is not valid',
    );
  });

  it('addphoto to album', async () => {
    const user: UsuarioEntity = await repository_usuario.save({
      nombre: faker.internet.userName(),
      telefono: faker.phone.number(),
      fotos: [],
      albunes: [],
    });
    const photo: FotoEntity = {
      id: '',
      apertura: faker.number.int({ min: 1, max: 32 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      iso: faker.number.int({ min: 100, max: 6400 }),
      fecha: faker.date.anytime().toISOString(),
      usuario: user,
      album: album_list[0],
    };
    await service.addPhotoToAlbum(photo, album_list[0].id);
    const album_edited = await repository.findOne({
      where: { id: album_list[0].id },
      relations: ['fotos'],
    });
    expect(album_edited.fotos.length).toEqual(1);
  });

  it('delete should delete an existing album and empty album', async () => {
    const album: AlbumEntity = album_list[0];
    await service.delete(album.id);
    const delFoto: AlbumEntity = await repository.findOne({
      where: { id: album.id },
    });
    expect(delFoto).toBeNull();
  });

  it('delete should throw an error if album is not empty', async () => {
    const foto: FotoEntity = await repository_foto.save({
      apertura: faker.number.int({ min: 1, max: 32 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      iso: faker.number.int({ min: 100, max: 6400 }),
      fecha: faker.date.anytime().toISOString(),
    });
    album_list[0].fotos.push(foto);

    const album_edited = await repository.save(album_list[0]);

    expect(() => service.delete(album_edited.id)).rejects.toHaveProperty(
      'message',
      'The album with fotos cant be deleted',
    );
  });
});
