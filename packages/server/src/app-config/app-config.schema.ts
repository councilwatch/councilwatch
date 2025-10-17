import Joi from 'joi';

export type CouncilWatchConfig = {
  APP_HOST: string;
  APP_PORT: number;
  API_PREFIX: string;

  DATABASE_URL: string;
};

export const appConfigSchema = Joi.object<CouncilWatchConfig, true>({
  APP_HOST: Joi.string().default('localhost'),
  APP_PORT: Joi.number().default(8080),
  API_PREFIX: Joi.string().default('api'),

  DATABASE_URL: Joi.string().required(),
});
