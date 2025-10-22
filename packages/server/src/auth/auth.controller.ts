import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Result } from '../common/dto/result.dto';
import { User } from '../users/entities/user.entity';
import { JWT_SECURITY } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { MagicAuthGuard } from './guards/magic.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<Result> {
    return this.authService.register(registerDto);
  }

  @Post('complete-registration')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity(JWT_SECURITY)
  completeRegistration(@CurrentUser() user: User): Promise<Result> {
    return this.authService.completeRegistration(user);
  }

  @Post('login')
  @UseGuards(MagicAuthGuard)
  async login(@Body() _loginDto: LoginDto, @CurrentUser() user: User): Promise<Result> {
    return this.authService.login(user);
  }
}
