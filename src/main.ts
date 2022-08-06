import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { Logger } from '@nestjs/common';

//ROOT OF STARTING POINT OF APPLICATION
async function bootstrap() {
  const logger = new Logger()
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1')
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
