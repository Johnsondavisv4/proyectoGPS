import { Injectable } from '@nestjs/common';
import { CitaEstado } from '../entities/cita.entity';

@Injectable()
export class EnumsService {
  getCitaEstado(): CitaEstado[] {
    return Object.values(CitaEstado);
  }
}
