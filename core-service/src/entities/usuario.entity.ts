import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CentroSalud } from './centro-salud.entity';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  email: string;

  @Column({ type: 'char', length: 1, default: 'A' })
  estado: string;

  @Column()
  id_centro_salud: number;

  @ManyToOne(() => CentroSalud, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_centro_salud' })
  centro_salud: CentroSalud;
}
