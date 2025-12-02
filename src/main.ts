import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // configuracion de cors
  app.enableCors();
  
  // puerto dinamico para render
  const port = process.env.PORT || 8080;
  
  await app.listen(port);
  console.log(`servidor corriendo en puerto ${port}`);
}

bootstrap();
