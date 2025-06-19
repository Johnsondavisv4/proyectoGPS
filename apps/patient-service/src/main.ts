import { NestFactory } from '@nestjs/core';
import { PatientModule } from './patient.module';

async function bootstrap() {
  const app = await NestFactory.create(PatientModule);

  const port = parseInt(process.env.PORT_PATIENT || '3000', 10);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
