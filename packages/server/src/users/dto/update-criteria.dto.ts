import { OmitType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateCriteriaDto extends OmitType(User, ['id', 'role']) {
  @IsArray()
  councilsIds: string[];
}
