import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @Column()
  direccion: string;

  @Column()
  rut: string;

  @Column()
  nombre: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ length: 1 })
  genero: string;

  @Column()
  telefono: string;
}
