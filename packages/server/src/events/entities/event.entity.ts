import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @ApiProperty({ description: 'Unique identifier for the event.' })
  id: string;

  @Column({ name: 'title' })
  @ApiProperty({ description: 'Title of the event.' })
  title: string;

  @Column({ name: 'description' })
  @ApiProperty({ description: 'Short description of the event.' })
  description: string;

  @Column({ name: 'date' })
  @ApiProperty({ description: 'The date and time the event will take place.' })
  date: Date;

  @Column({ name: 'location' })
  @ApiProperty({ description: 'Where the event will take place.' })
  location: string;

  @Column({ name: 'zip_code' })
  @ApiProperty({ description: 'The zip code of the event location.' })
  zipCode: number;

  @Column({ name: 'council_id' })
  @ApiProperty({ description: 'The ID of the council associated with the event.' })
  councilId: string;

  @Column({ name: 'approved' })
  @ApiProperty({ description: 'Whether the event has been approved.' })
  approved: boolean;
}
