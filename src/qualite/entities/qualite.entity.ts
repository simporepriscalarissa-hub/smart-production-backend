import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Ouvrier } from '../../ouvriers/entities/ouvrier.entity';

@Entity()
export class Qualite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ouvrier)
  ouvrier: Ouvrier;

  @Column()
  reference: string;

  @Column()
  statutIA: string;

  @Column()
  statutFinal: string;

  @Column({ default: false })
  correctionOuvrier: boolean;

  @Column({ default: 'IA' })
  sourceDecision: string;

  @Column({ nullable: true })
  typeDefaut: string;
  @CreateDateColumn()
  createdAt: Date;
}
