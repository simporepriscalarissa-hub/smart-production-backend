import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOuvrierDto } from './dto/create-ouvrier.dto';
import { UpdateOuvrierDto } from './dto/update-ouvrier.dto';
import { Ouvrier } from './entities/ouvrier.entity';

@Injectable()
export class OuvriersService {
  constructor(
    @InjectRepository(Ouvrier)
    private ouvriersRepository: Repository<Ouvrier>,
  ) {}

  create(createOuvrierDto: CreateOuvrierDto) {
    const ouvrier = this.ouvriersRepository.create(createOuvrierDto);
    return this.ouvriersRepository.save(ouvrier);
  }

  findAll(departement?: string) {
    if (departement) {
      return this.ouvriersRepository.find({ where: { departement } });
    }
    return this.ouvriersRepository.find();
  }

  findOne(id: number) {
    return this.ouvriersRepository.findOne({ where: { id } });
  }

  findByRfid(rfid: string) {
    return this.ouvriersRepository.findOne({ where: { rfid } });
  }

  async update(id: number, updateOuvrierDto: UpdateOuvrierDto) {
    await this.ouvriersRepository.update(id, updateOuvrierDto);
    return this.ouvriersRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.ouvriersRepository.delete(id);
    return { message: `Ouvrier ${id} supprimé avec succès` };
  }

  // Appelé quand l'ouvrier scanne son badge RFID
  async marquerPresence(rfid: string) {
    const ouvrier = await this.ouvriersRepository.findOne({ where: { rfid } });
    if (!ouvrier) return null;
    ouvrier.dernierePresence = new Date();
    return this.ouvriersRepository.save(ouvrier);
  }

  // Vérifie si l'ouvrier est actif aujourd'hui
  estActifAujourdhui(ouvrier: Ouvrier): boolean {
    if (!ouvrier.dernierePresence) return false;
    const aujourd = new Date();
    const presence = new Date(ouvrier.dernierePresence);
    return (
      presence.getDate() === aujourd.getDate() &&
      presence.getMonth() === aujourd.getMonth() &&
      presence.getFullYear() === aujourd.getFullYear()
    );
  }
}
