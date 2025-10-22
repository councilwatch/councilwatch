import Joi from 'joi';
import type { Algorithm } from 'jsonwebtoken';

export type CouncilWatchConfig = {
  APP_HOST: string;
  APP_PORT: number;
  API_PREFIX: string;

  DATABASE_URL: string;

  JWT_ALGORITHM: Algorithm;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
  JWT_SECRET: string;
  JWT_LIFETIME: string;
};

export const appConfigSchema = Joi.object<CouncilWatchConfig, true>({
  APP_HOST: Joi.string().default('localhost'),
  APP_PORT: Joi.number().default(8080),
  API_PREFIX: Joi.string().default('api'),

  DATABASE_URL: Joi.string().required(),

  JWT_ALGORITHM: Joi.string()
    .valid(
      'HS256',
      'HS384',
      'HS512',
      'RS256',
      'RS384',
      'RS512',
      'ES256',
      'ES384',
      'ES512',
      'PS256',
      'PS384',
      'PS512',
    )
    .default('HS256'),
  JWT_AUDIENCE: Joi.string().required(),
  JWT_ISSUER: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_LIFETIME: Joi.string().required(),
});
