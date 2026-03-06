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
}
