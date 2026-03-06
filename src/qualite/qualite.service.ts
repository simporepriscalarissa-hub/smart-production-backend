import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQualiteDto } from './dto/create-qualite.dto';
import { UpdateQualiteDto } from './dto/update-qualite.dto';
import { Qualite } from './entities/qualite.entity';

@Injectable()
export class QualiteService {
  constructor(
    @InjectRepository(Qualite)
    private qualiteRepository: Repository<Qualite>,
  ) {}

  // appelé automatiquement par la caméra IA via ESP32/MQTT
  create(createQualiteDto: CreateQualiteDto) {
    const qualite = this.qualiteRepository.create({
      reference: createQualiteDto.reference,
      statutIA: createQualiteDto.statutIA,
      statutFinal: createQualiteDto.statutIA, // par défaut = décision IA
      correctionOuvrier: false, // pas de correction par défaut
      sourceDecision: 'IA', // décision vient de l'IA
      typeDefaut: createQualiteDto.typeDefaut,
      ouvrier: { id: createQualiteDto.ouvrierId },
    });
    return this.qualiteRepository.save(qualite);
  }

  // appelé quand l'ouvrier corrige la décision de l'IA
  async corrigerDecision(id: number, statutFinal: string, typeDefaut?: string) {
    await this.qualiteRepository.update(id, {
      statutFinal,
      correctionOuvrier: true,
      sourceDecision: 'ouvrier',
      typeDefaut,
    });
    return this.qualiteRepository.findOne({
      where: { id },
      relations: ['ouvrier'],
    });
  }

  findAll() {
    return this.qualiteRepository.find({ relations: ['ouvrier'] });
  }

  findOne(id: number) {
    return this.qualiteRepository.findOne({
      where: { id },
      relations: ['ouvrier'],
    });
  }

  findByStatut(statut: string) {
    return this.qualiteRepository.find({
      where: { statutFinal: statut },
      relations: ['ouvrier'],
    });
  }

  async update(id: number, updateQualiteDto: UpdateQualiteDto) {
    await this.qualiteRepository.update(id, updateQualiteDto);
    return this.qualiteRepository.findOne({
      where: { id },
      relations: ['ouvrier'],
    });
  }

  async remove(id: number) {
    await this.qualiteRepository.delete(id);
    return { message: `Qualite ${id} supprimée avec succès` };
  }
}
