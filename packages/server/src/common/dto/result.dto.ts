import { ApiProperty } from '@nestjs/swagger';

export class Result {
  @ApiProperty({
    description: 'The timestamp when the result was created',
  })
  timestamp: number;

  @ApiProperty({
    description: 'A message providing additional information about the result',
  })
  message: string;

  constructor(message: string) {
    this.timestamp = Date.now();
    this.message = message;
  }
}
