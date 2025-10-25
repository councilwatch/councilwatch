import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
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
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { ttl: 30_000, limit: 1 } }) // Limit to 2 request's per minute per IP
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Begins the registration process for a new user. The user will recieve an email with instructions ' +
      'on how to complete their registration.',
  })
  register(@Body() registerDto: RegisterDto): Promise<Result> {
    return this.authService.register(registerDto);
  }

  @Post('complete-registration')
  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Complete user registration',
    description: 'Completes the registration process for a new and persists the user in the database.',
  })
  completeRegistration(@CurrentUser() user: User): Promise<Result> {
    return this.authService.completeRegistration(user);
  }

  @Post('login')
  @UseGuards(MagicAuthGuard, ThrottlerGuard)
  @ApiOperation({
    summary: 'Log in a user',
    description: 'Logs in a user using a magic link sent to their email address.',
  })
  async login(@Body() _loginDto: LoginDto, @CurrentUser() user: User): Promise<Result> {
    return this.authService.login(user);
  }
}
