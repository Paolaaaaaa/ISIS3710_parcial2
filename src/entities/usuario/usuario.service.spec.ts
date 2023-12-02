import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { TypeOrmTestingConfig } from '../../shared/errors/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuario_list: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usuario_list = [];

    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.internet.userName(),
        telefono: faker.phone.number(),
        albunes: [],
        fotos: [],
      });
      usuario_list.push(usuario);
    }
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return a usuario by id', async () => {
    const stored_usuario: UsuarioEntity = usuario_list[0];
    const usuario: UsuarioEntity = await service.findOne(stored_usuario.id);
    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toEqual(stored_usuario.nombre);
    expect(usuario.telefono).toEqual(stored_usuario.telefono);
  });

  it('findOne should throw an error if usuario does not exist', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The usuario with given id was not found',
    );
  });

  it('create should create a new usuario', async () => {
    const usuario: UsuarioEntity = {
      nombre: faker.internet.userName(),
      telefono: '0123456789',
      albunes: [],
      fotos: [],
      id: '',
      redsocial: null,
    };

    const newusuario: UsuarioEntity = await service.create(usuario);
    expect(newusuario).not.toBeNull();

    const stored_usuario: UsuarioEntity = await repository.findOne({
      where: { id: newusuario.id },
    });
    expect(stored_usuario).not.toBeNull();
    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toEqual(stored_usuario.nombre);
    expect(usuario.telefono).toEqual(stored_usuario.telefono);
  });

  it('create should throw an error if number is wrong', async () => {
    const user: UsuarioEntity = await repository.save({
      nombre: faker.internet.userName(),
      telefono: '123',
      fotos: [],
      albunes: [],
    });

    await expect(() => service.create(user)).rejects.toHaveProperty(
      'message',
      'The usuario number is not valid',
    );
  });


  it('findAll should return all users', async () => {
    const usuarios: UsuarioEntity[] = await service.findAll();
    expect(usuarios).not.toBeNull();
    expect(usuarios.length).toBe(usuario_list.length);
  });

 
});
