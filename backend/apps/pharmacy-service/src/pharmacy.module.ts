import { Module } from '@nestjs/common';
import { MedicamentoService } from './services/medicamento.service';
import { RecetaService } from './services/receta.service';
import { RecetaMedicamentoService } from './services/receta-medicamento.service';
import { DespachoMedicamentoService } from './services/despacho-medicamento.service';
import { MedicamentoController } from './controllers/medicamento.controller';
import { RecetaController } from './controllers/receta.controller';
import { RecetaMedicamentoController } from './controllers/receta-medicamento.controller';
import { DespachoMedicamentoController } from './controllers/despacho-medicamento.controller';

@Module({
  imports: [],
  controllers: [MedicamentoController, RecetaController, RecetaMedicamentoController, DespachoMedicamentoController],
  providers: [MedicamentoService, RecetaService, RecetaMedicamentoService, DespachoMedicamentoService],
})
export class PharmacyModule {}
