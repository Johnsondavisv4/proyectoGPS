import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecetaMedicamento } from './receta-medicamento.entity';

@Entity('despacho_medicamento')
export class DespachoMedicamento {
  @PrimaryGeneratedColumn({ name: 'id_despacho' })
  id_despacho: number;

  @Column({ name: 'fecha_despacho', type: 'timestamp', nullable: false })
  fecha_despacho: Date;

  @Column({
    name: 'cantidad_despachada',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  cantidad_despachada: string;

  @Column({ name: 'id_farmacia', type: 'int', nullable: true })
  id_farmacia: number | null;

  @ManyToOne(() => RecetaMedicamento, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_receta_med' })
  id_receta_med: RecetaMedicamento;
}
