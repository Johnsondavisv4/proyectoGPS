import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicamento')
export class Medicamento {
  @PrimaryGeneratedColumn({ name: 'id_medicamento' })
  id_medicamento: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'presentacion', type: 'varchar', length: 50, nullable: true })
  presentacion: string | null;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string | null;
}
