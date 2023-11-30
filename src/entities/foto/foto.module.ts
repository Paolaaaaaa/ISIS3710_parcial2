import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { FotoService } from './foto.service';
@Module({
  imports: [TypeOrmModule.forFeature([FotoEntity])],
  providers: [FotoService],
})
export class FotoModule {}
