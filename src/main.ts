import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validaciones
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Booksy API')
    .setDescription('API de libreria digital')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // cors
  app.enableCors();

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`servidor corriendo en puerto ${port}`);
}

bootstrap();