import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MagicStrategy } from './strategies/magic.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          algorithm: configService.get('JWT_ALGORITHM'),
          audience: configService.get('JWT_AUDIENCE'),
          issuer: configService.get('JWT_ISSUER'),
          expiresIn: configService.get('JWT_LIFETIME'),
        },
      }),
    }),
    AppConfigModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, MagicStrategy, JwtStrategy],
})
export class AuthModule {}
