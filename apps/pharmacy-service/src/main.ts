import { NestFactory } from '@nestjs/core';
import { PharmacyModule } from './pharmacy.module';

async function bootstrap() {
  const app = await NestFactory.create(PharmacyModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
