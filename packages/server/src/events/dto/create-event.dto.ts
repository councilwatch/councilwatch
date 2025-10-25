import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsZipCode } from '../../common/decorators/is-zip-code.validator';
import { Event } from '../entities/event.entity';

export class CreateEventDto extends OmitType(Event, ['id', 'approved']) {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsZipCode()
  zipCode: number;

  @IsUUID()
  councilId: string;
}
