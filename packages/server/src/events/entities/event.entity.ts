import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @ApiProperty({ description: 'Unique identifier for the event.' })
  id: string;

  @Column({ name: 'title' })
  @ApiProperty({ description: 'Title of the event. Must be between 5 and 200 characters.' })
  title: string;

  @Column({ name: 'description' })
  @ApiProperty({ description: 'Short description of the event. Must be between 5 and 1,000 characters' })
  description: string;

  @Column({ name: 'date' })
  @ApiProperty({ description: 'The date and time the event will take place.' })
  date: Date;

  @Column({ name: 'council_id' })
  @ApiProperty({ description: 'The ID of the council associated with the event.' })
  councilId: string;

  @Column({ name: 'approved' })
  @ApiProperty({ description: 'Whether the event has been approved.' })
  approved: boolean;
}
