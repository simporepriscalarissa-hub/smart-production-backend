import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OuvriersService } from './ouvriers.service';
import { OuvriersController } from './ouvriers.controller';
import { Ouvrier } from './entities/ouvrier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ouvrier])],
  controllers: [OuvriersController],
  providers: [OuvriersService],
})
export class OuvriersModule {}
