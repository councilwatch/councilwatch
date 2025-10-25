import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from './create-event.dto';

/**
 * Joins the {@link Event} entity that contains the documentation with the {@link CreateEventDto} that
 * contains the validation rules, omits the the `id` field, and then makes all fields optional for updates.
 */
export class UpdateEventDto extends PartialType(OmitType(IntersectionType(Event, CreateEventDto), ['id'])) {}
