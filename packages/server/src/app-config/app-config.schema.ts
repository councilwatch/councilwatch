import Joi from 'joi';

export type CouncilWatchConfig = {
  APP_HOST: string;
  APP_PORT: number;
  API_PREFIX: string;

  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
};

export const appConfigSchema = Joi.object<CouncilWatchConfig, true>({
  APP_HOST: Joi.string().default('localhost'),
  APP_PORT: Joi.number().default(8080),
  API_PREFIX: Joi.string().default('api'),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
