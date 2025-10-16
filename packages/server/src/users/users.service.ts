import { ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import type { Repository } from 'typeorm';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

// TODO: Mostly just a placeholder, we'll tidy this up later. Need to set cookies and all that jazz

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<boolean> {
    try {
      const user = this.usersRepository.create(registerDto);

      const salt = await genSalt(10);
      user.password = await hash(user.password, salt);

      await this.usersRepository.save(user);

      return true;
    } catch (error) {
      this.logger.error('Error registering user', error);

      throw new InternalServerErrorException('Error registering user');
    }
  }

  async login(loginDto: LoginDto): Promise<boolean> {
    const user: Pick<User, 'password'> | null = await this.usersRepository.findOne({
      where: { email: loginDto.email },
      select: { password: true },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const passwordMatches = await compare(loginDto.password, user.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    return true;
  }
}
