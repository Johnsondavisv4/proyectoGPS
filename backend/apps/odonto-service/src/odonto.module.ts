import { Module } from '@nestjs/common';
import { ProgramaSaludOralService } from './services/programa-salud-oral.service';
import { FichaOdontologicaService } from './services/ficha-odontologica.service';
import { OdontogramaService } from './services/odontograma.service';
import { RadiografiaService } from './services/radiografia.service';
import { ProgramaSaludOralController } from './controllers/programa-salud-oral.controller';
import { FichaOdontologicaController } from './controllers/ficha-odontologica.controller';
import { OdontogramaController } from './controllers/odontograma.controller';
import { RadiografiaController } from './controllers/radiografia.controller';

@Module({
  imports: [],
  controllers: [
    ProgramaSaludOralController,
    FichaOdontologicaController,
    OdontogramaController,
    RadiografiaController,
  ],
  providers: [
    ProgramaSaludOralService,
    FichaOdontologicaService,
    OdontogramaService,
    RadiografiaService,
  ],
})
export class OdontoModule {}
