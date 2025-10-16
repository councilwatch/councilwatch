import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION_SERVICE_TOKEN } from '@nestjs/config/dist/config.constants';
import { appConfigSchema } from './app-config.schema';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: appConfigSchema,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  providers: [{ provide: AppConfigService, useExisting: CONFIGURATION_SERVICE_TOKEN }],
  exports: [AppConfigService],
})
export class AppConfigModule {}
