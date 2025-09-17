import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { NotFoundExceptionFilter } from './filter/NotFoundExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable global exception handling
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // Apply cookie-parser middleware
  app.use(cookieParser());

  // Enable CORS with specific options (optional)
  app.use(cors({
    origin: '*', // 'http://example.com' // Allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed methods
    allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
    credentials: true,  // Enable credentials
  }));

  // Global API prefix
  app.setGlobalPrefix('api');

  // Set body-parser size limit
  app.use(bodyParser.json({ limit: '10mb' }));  // Limit body payload to 10MB
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  const port = process.env.PORT;

  if (!port) {
    throw new Error('PORT environment variable is not defined.');
  }

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('NestJS + Swagger + JWT example')
    .setVersion('1.0')
    .addBearerAuth() // <-- enables the Authorize button (type: http, scheme: bearer)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(port);
  console.log(`🚀 Listening on http://localhost:${port}/api`);
}

bootstrap();