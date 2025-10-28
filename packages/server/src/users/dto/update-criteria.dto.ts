import { IsArray } from 'class-validator';

export class UpdateCriteriaDto {
  @IsArray()
  councilsIds: string[];
}
