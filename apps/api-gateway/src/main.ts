import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Security Headers
   */
  app.use(helmet());

  /**
   * Enable CORS
   */
  app.enableCors({
    origin: true,
    credentials: true,
  });
  /**
   * Validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * Rate Limiting
   */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 menit
      max: 100, // max request per IP
      message: {
        statusCode: 429,
        message: 'Too many requests, please try again later.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  /**
   * Compression
   */
  app.use(compression());

  /**
   * Cookie Parser
   */
  app.use(cookieParser());

  /**
   * Graceful Shutdown
   */
  app.enableShutdownHooks();

  const port = process.env.PORT ?? 3030;

  await app.listen(port);

  console.log(`🚀 API Gateway running on http://localhost:${port}/api`);
}

bootstrap();
