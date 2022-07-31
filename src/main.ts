import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//ROOT OF STARTING POINT OF APPLICATION
async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1')
  await app.listen(port);
  console.log(`APP IS LISTENING ON PORT ${port}`)
}
bootstrap();
