import { Logger, ValidationPipe } from '@nestjs/common';
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
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
    }),
  );

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('CouncilWatch API')
    .setDescription('The bigger brother to Big Brother.')
    .setLicense('Licensed under the AGPL-3.0 license', 'https://www.gnu.org/licenses/agpl-3.0.en.html')
    .setContact('CouncilWatch Team', 'https://councilwatch.com/contact', '')
    .setExternalDoc('Source Code - GitHub', 'https://github.com/councilwatch/councilwatch')
    .setTermsOfService('https://councilwatch.com/terms')
    .addBearerAuth({ type: 'http' }, JWT)
    .addServer(`http://${host}:${port}`, 'Localhost')
    .addServer('https://councilwatch.com', 'Production') // TODO: Update when we have a production URL
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
