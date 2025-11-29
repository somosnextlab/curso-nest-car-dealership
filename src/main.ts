import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //solo deja que pase la data que estoy esperando
      whitelist: true,
      //con esto le devuelvo al cliente un error, sobre la info que esta enviando mal
      forbidNonWhitelisted: true
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
