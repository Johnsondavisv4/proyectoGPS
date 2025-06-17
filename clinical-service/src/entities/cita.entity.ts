import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CitaEstado {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
}

@Entity({ name: 'cita' })
export class Cita {
  @PrimaryGeneratedColumn({ name: 'id_cita' })
  idCita: number;

  @Column({ type: 'date', name: 'fecha_hora' })
  fechaHora: Date;

  @Column({ type: 'varchar', length: 20, name: 'tipo_cita' })
  tipoCita: string;

  @Column({
    type: 'enum',
    enum: CitaEstado,
    default: CitaEstado.PENDIENTE,
    name: 'estado',
  })
  estado: CitaEstado;

  @Column({ type: 'text', name: 'observacion' })
  observacion: string;

  @Column({ type: 'int', name: 'id_paciente' })
  idPaciente: number;

  @Column({ type: 'int', name: 'id_usuario' })
  idUsuario: number;

  @Column({ type: 'int', name: 'id_centro_salud' })
  idCentroSalud: number;
}
