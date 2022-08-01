import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';

//ROOT OF STARTING POINT OF APPLICATION
async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1')
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(port);
  console.log(`APP IS LISTENING ON PORT ${port}`)
}
bootstrap();
