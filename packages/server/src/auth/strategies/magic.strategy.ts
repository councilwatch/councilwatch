import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { User } from '../../users/entities/user.entity';
import { MAGIC } from '../auth.constants';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicStrategy extends PassportStrategy(Strategy, MAGIC) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<User> {
    const email = req.body?.email;

    if (!email) {
      throw new BadRequestException('Missing email');
    }

    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    return user;
  }
}
