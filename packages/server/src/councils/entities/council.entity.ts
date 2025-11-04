import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('IDX_councils_name', ['name'])
@Entity('councils')
export class Council {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'lat', type: 'double precision' })
  lat: number;

  @Column({ name: 'lon', type: 'double precision' })
  lon: number;
}
