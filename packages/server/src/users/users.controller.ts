import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<boolean> {
    return this.usersService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<boolean> {
    return this.usersService.register(loginDto);
  }
}
