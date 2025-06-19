import { NestFactory } from '@nestjs/core';
import { ClinicalModule } from './clinical.module';

async function bootstrap() {
  const app = await NestFactory.create(ClinicalModule);

  const port = parseInt(process.env.PORT_CLINICAL || '3000', 10);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
