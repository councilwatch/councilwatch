import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '../../app-config/app-config.service';
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

  async validate(payload: { email: string; role: string }) {
    return { email: payload.email, role: payload.role };
  }
}
