import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Familia } from './familia.entity';
import { TipoRelacion } from './tipo-relacion.entity';
import { Paciente } from './paciente.entity';

@Entity('miembro_familiar')
export class MiembroFamiliar {
  @PrimaryGeneratedColumn()
  id_miembro_familiar: number;

  @Column()
  nombre: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ length: 1, nullable: true })
  genero: string;

  @ManyToOne(() => Familia)
  @JoinColumn({ name: 'id_familia' })
  id_familia: Familia;

  @ManyToOne(() => TipoRelacion)
  @JoinColumn({ name: 'id_tipo_relacion' })
  id_tipo_relacion: TipoRelacion;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: 'id_paciente' })
  id_paciente: Paciente;
}
