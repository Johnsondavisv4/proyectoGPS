import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programa_control')
export class ProgramaControl {
  @PrimaryGeneratedColumn()
  id_programa_control: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ length: 1 })
  activo: string;

  @Column()
  codigo: string;
}
