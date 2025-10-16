import { Injectable } from '@nestjs/common';
import {
  type ConfigGetOptions,
  ConfigService,
  type NoInferType,
  type Path,
  type PathValue,
} from '@nestjs/config';
import type { CouncilWatchConfig } from './app-config.schema';

@Injectable()
export class AppConfigService extends ConfigService<CouncilWatchConfig, true> {
  override get<P extends Path<CouncilWatchConfig>, R = PathValue<CouncilWatchConfig, P>>(
    propertyPath: P,
    defaultValue?: NoInferType<R>,
    options?: Omit<ConfigGetOptions, 'infer'>,
  ) {
    return super.get<CouncilWatchConfig, P, R>(propertyPath, defaultValue as NoInferType<R>, {
      infer: true,
      ...options,
    });
  }
}
