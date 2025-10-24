import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '../../app-config/app-config.service';
import { User } from '../../users/entities/user.entity';
import { JWT } from '../auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(readonly configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: [configService.get('JWT_ALGORITHM')],
      secretOrKey: configService.get('JWT_SECRET'),
      audience: configService.get('JWT_AUDIENCE'),
      issuer: configService.get('JWT_ISSUER'),
      ignoreExpiration: false,
    });
  }

  /**
   * Purely here to satisfy Passport strategy requirements. The actual validation is handled by the strategy
   * imported from `passport-jwt`.
   */
  validate(user: User): User {
    return user;
  }
}
