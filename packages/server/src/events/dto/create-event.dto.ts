import { OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { Event } from '../entities/event.entity';

export class CreateEventDto extends OmitType(Event, ['id', 'approved']) {
  @IsString()
  @IsNotEmpty()
  @Length(5, 200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 1_000)
  description: string;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsInt()
  councilId: number;
}
