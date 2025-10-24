import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { instanceToPlain } from 'class-transformer';
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

    // The AuthService returns an instance of the User entity but a JWT can only be signed with plain objects
    // so we safely convert and type cast it here using class-transformer.
    return instanceToPlain(user) as User;
  }
}
