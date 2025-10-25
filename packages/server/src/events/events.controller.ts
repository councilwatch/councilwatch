import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JWT_SECURITY } from '../auth/auth.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Create an event',
    description:
      'Used for manually creating a new event that may have been missed by the automated scraper. You must' +
      'be logged in to use this endpoint. This endpoint is also rate limited to prevent abuse.',
  })
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  // TODO: Doubt we need a findAll public endpoint, consider removing
  @Get()
  @UseGuards(ThrottlerGuard)
  @ApiOperation({
    summary: 'Get all events',
    description:
      'Retrieves a list of every event in the system. Will likely be removed. This endpoint is also rate ' +
      'limited to prevent abuse.',
  })
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({
    summary: 'Get a specific event',
    description: "Retrieves a single event by it's ID. This endpoint is also rate limited to prevent abuse.",
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Update an event',
    description: "Updates a single event by it's ID.",
  })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Delete an event',
    description: "Deletes a single event by it's ID.",
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Event> {
    return this.eventsService.remove(id);
  }
}
