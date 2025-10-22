import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
