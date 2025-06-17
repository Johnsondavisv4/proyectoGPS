import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CentroSalud } from './centro-salud.entity';

export enum usuario_estado {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

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

  @Column({ length: 100, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: usuario_estado,
    default: usuario_estado.ACTIVO,
    name: 'estado',
  })
  estado: usuario_estado;

  @Column()
  id_centro_salud: number;

  @ManyToOne(() => CentroSalud, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_centro_salud' })
  centro_salud: CentroSalud;
}
