import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './redSocial.entity';
import { RedSocialService } from './redSocial.service';
import { RedSocialController } from './redSocial.controller';
@Module({
  imports: [TypeOrmModule.forFeature([RedSocialEntity])],
  providers: [RedSocialService],
  controllers: [RedSocialController],
})
export class RedSocialModule {}
