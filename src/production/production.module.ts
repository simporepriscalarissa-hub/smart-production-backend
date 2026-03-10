import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionService } from './production.service';
import { ProductionController } from './production.controller';
import { Production } from './entities/production.entity';
import { EventsModule } from '../events/events.module'; // ← ajoute cet import

@Module({
  imports: [
    TypeOrmModule.forFeature([Production]),
    EventsModule, // ← ajoute ça
  ],
  controllers: [ProductionController],
  providers: [ProductionService],
})
export class ProductionModule {}
