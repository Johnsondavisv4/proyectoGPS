import { NestFactory } from '@nestjs/core';
import { OdontoModule } from './odonto.module';

async function bootstrap() {
  const app = await NestFactory.create(OdontoModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
