import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService) => ({
        type: 'postgres',
        applicationName: 'CouncilWatch',
        url: configService.get('DATABASE_URL'),
        synchronize: false,
        autoLoadEntities: true,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        migrations: [join(__dirname, 'common', 'migrations', '*.{ts,js}')],
        migrationsRun: true,
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60_000, limit: 60 }], // 60 requests per minute. TODO: See if these values are appropriate
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    EmailModule,
    EventsModule,
  ],
})
export class AppModule {}
