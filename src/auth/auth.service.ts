import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Ouvrier } from '../ouvriers/entities/ouvrier.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Ouvrier)
    private ouvriersRepository: Repository<Ouvrier>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user)
      throw new UnauthorizedException('Email ou mot de passe incorrect');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Email ou mot de passe incorrect');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        departement: user.departement,
      },
    };
  }

  async rfidLogin(rfid: string) {
    const ouvrier = await this.ouvriersRepository.findOne({ where: { rfid } });
    if (!ouvrier) throw new UnauthorizedException('Badge non reconnu');

    // ✅ Marquer la présence automatiquement au scan du badge
    ouvrier.dernierePresence = new Date();
    await this.ouvriersRepository.save(ouvrier);

    const payload = { sub: ouvrier.id, rfid: ouvrier.rfid, role: 'operateur' };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: ouvrier.id,
        nom: ouvrier.nom,
        prenom: ouvrier.prenom,
        role: 'operateur',
        rfid: ouvrier.rfid,
        departement: ouvrier.departement,
      },
    };
  }

  async register(
    nom: string,
    prenom: string,
    email: string,
    password: string,
    role: string,
    departement?: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
      departement,
    });
    const savedUser = await this.usersRepository.save(user);
    return {
      id: savedUser.id,
      nom: savedUser.nom,
      prenom: savedUser.prenom,
      email: savedUser.email,
      role: savedUser.role,
      departement: savedUser.departement,
    };
  }
}
