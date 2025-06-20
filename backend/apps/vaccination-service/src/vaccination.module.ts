import { Module } from '@nestjs/common';
import { VacunaService } from './services/vacuna.service';
import { CalendarioVacunaService } from './services/calendario-vacuna.service';
import { RegistroVacunacionService } from './services/registro-vacunacion.service';
import { AlertaInasistenciaService } from './services/alerta-inasistencia.service';
import { VacunaController } from './controllers/vacuna.controller';
import { CalendarioVacunaController } from './controllers/calendario-vacuna.controller';
import { RegistroVacunacionController } from './controllers/registro-vacunacion.controller';
import { AlertaInasistenciaController } from './controllers/alerta-inasistencia.controller';

@Module({
  imports: [],
  controllers: [VacunaController, CalendarioVacunaController, RegistroVacunacionController, AlertaInasistenciaController],
  providers: [VacunaService, CalendarioVacunaService, RegistroVacunacionService, AlertaInasistenciaService],
})
export class VaccinationModule {}
