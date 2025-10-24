import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './app-config/app-config.service';
import { JWT } from './auth/auth.constants';

async function bootstrap() {
  const logger = new Logger('CouncilWatch');

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get<AppConfigService>(AppConfigService);

  const host = configService.get('APP_HOST');
  const port = configService.get('APP_PORT');
  const apiPrefix = configService.get('API_PREFIX');
  const docsPath = `${apiPrefix}/docs`;

  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('CouncilWatch API')
    .setDescription('The bigger brother to Big Brother.')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http' }, JWT)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(docsPath, app, document, {
    customSiteTitle: 'CouncilWatch API Docs',
    jsonDocumentUrl: `${docsPath}/json`,
    yamlDocumentUrl: `${docsPath}/yaml`,
    swaggerOptions: {
      tryItOutEnabled: true,
      defaultModelsExpandDepth: 999,
      defaultModelExpandDepth: 999,
      displayRequestDuration: true,
    },
  });

  await app.listen(port, host, (err, address) => {
    if (err) {
      logger.error(err);

      process.exit(1);
    }

    logger.log(`Application is running on: ${address}`);
  });
}

bootstrap();
