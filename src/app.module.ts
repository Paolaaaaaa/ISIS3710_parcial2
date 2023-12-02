import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './entities/foto/foto.entity';
import { FotoModule } from './entities/foto/foto.module';
import { AlbumModule } from './entities/album/album.module';
import { UsuarioModule } from './entities/usuario/usuario.module';
import { RedSocialModule } from './entities/redSocial/redSocial.Module';
import { RedSocialEntity } from './entities/redSocial/redSocial.entity';
import { AlbumEntity } from './entities/album/album.entity';
import { UsuarioEntity } from './entities/usuario/usuario.entity';

@Module({
  imports: [
    FotoModule,
    AlbumModule,
    UsuarioModule,
    RedSocialModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial2',
      entities: [FotoEntity, RedSocialEntity, AlbumEntity, UsuarioEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
