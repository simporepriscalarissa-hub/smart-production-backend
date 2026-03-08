import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';

async function bootstrap() {
  // Typage explicite de l'application
  const app: INestApplication = await NestFactory.create(AppModule);

  // Activer CORS pour ton frontend Next.js
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: false,
  });

  // Activer la validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // renvoie une erreur si une propriété non définie est envoyée
      transform: true,
    }),
  );

  await app.listen(3001);
}

bootstrap();
