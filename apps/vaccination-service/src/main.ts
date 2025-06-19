import { NestFactory } from '@nestjs/core';
import { VaccinationModule } from './vaccination.module';

async function bootstrap() {
  const app = await NestFactory.create(VaccinationModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
