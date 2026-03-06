import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { Production } from './entities/production.entity';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(Production)
    private productionRepository: Repository<Production>,
  ) {}

  create(createProductionDto: CreateProductionDto) {
    const production = this.productionRepository.create({
      reference: createProductionDto.reference,
      quantiteProduite: createProductionDto.quantiteProduite,
      quantiteConforme: createProductionDto.quantiteConforme,
      quantiteNonConforme: createProductionDto.quantiteNonConforme,
      ouvrier: { id: createProductionDto.ouvrierId },
    });
    return this.productionRepository.save(production);
  }

  findAll() {
    return this.productionRepository.find({ relations: ['ouvrier'] });
  }

  findOne(id: number) {
    return this.productionRepository.findOne({
      where: { id },
      relations: ['ouvrier'],
    });
  }

  async update(id: number, updateProductionDto: UpdateProductionDto) {
    await this.productionRepository.update(id, updateProductionDto);
    return this.productionRepository.findOne({
      where: { id },
      relations: ['ouvrier'],
    });
  }

  async remove(id: number) {
    await this.productionRepository.delete(id);
    return { message: `Production ${id} supprimée avec succès` };
  }
}
