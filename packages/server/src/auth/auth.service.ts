import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result } from '../common/dto/result.dto';
import { EmailService } from '../email/email.service';
import { User, UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<User | null> {
    const user = await this.usersService.getUser(email, false);

    return user;
  }

  async register(registerDto: RegisterDto): Promise<Result> {
    const user = await this.usersService.getUser(registerDto.email, false);

    if (user) {
      throw new ConflictException('A user with this email already exists. Please log in instead.');
    }

    const token = await this.jwtService.signAsync<User>({
      id: uuidv7(),
      email: registerDto.email,
      role: UserRole.USER,
    });

    await this.emailService.sendRegistrationEmail(registerDto.email, token);

    return new Result('Registration email sent successfully');
  }

  async completeRegistration(user: User): Promise<Result> {
    const existingUser = await this.usersService.getUser(user.email, false);

    if (existingUser) {
      throw new UnauthorizedException('Registration has already been completed for this email');
    }

    await this.usersService.createUser(user);

    return new Result('Registration completed successfully');
  }

  async login(user: User): Promise<Result> {
    const token = await this.jwtService.signAsync<User>(user);

    await this.emailService.sendLoginEmail(user.email, token);

    return new Result('Login email sent successfully');
  }
}
