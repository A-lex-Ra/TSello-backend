import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync, writeFileSync } from 'node:fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('./src/cert/key.pem'),
    cert: readFileSync('./src/cert/cert.pem'),
  };

  const app = await NestFactory.create(
    AppModule,
    { httpsOptions },
  );

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Trello API')
    .setDescription('API для клона Trello')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  writeFileSync('./openapi-spec.json', JSON.stringify(document, null, 2));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
