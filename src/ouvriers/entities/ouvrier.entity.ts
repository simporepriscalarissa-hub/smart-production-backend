import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ouvrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  rfid: string;

  @Column({ nullable: true })
  departement: string;

  @Column({ nullable: true, type: 'timestamp' })
  dernierePresence: Date;
}
