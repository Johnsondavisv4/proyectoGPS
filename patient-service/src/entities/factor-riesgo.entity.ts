import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Familia } from './familia.entity';

@Entity('factor_riesgo')
export class FactorRiesgo {
  @PrimaryGeneratedColumn()
  id_factor_riesgo: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => Familia)
  @JoinColumn({ name: 'id_familia' })
  id_familia: Familia;
}
