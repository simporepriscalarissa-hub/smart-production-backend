import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OuvriersService } from './ouvriers.service';
import { OuvriersController } from './ouvriers.controller';
import { Ouvrier } from './entities/ouvrier.entity';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ouvrier]), EventsModule],
  controllers: [OuvriersController],
  providers: [OuvriersService],
  exports: [OuvriersService],
})
export class OuvriersModule {}
