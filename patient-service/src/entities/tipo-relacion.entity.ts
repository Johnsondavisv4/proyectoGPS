import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_relacion')
export class TipoRelacion {
  @PrimaryGeneratedColumn()
  id_tipo_relacion: number;

  @Column()
  descripcion: string;
}
