import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Paciente } from './entities/paciente.entity';
import { ProgramaControl } from './entities/programa-control.entity';
import { Familia } from './entities/familia.entity';
import { TipoRelacion } from './entities/tipo-relacion.entity';
import { MiembroFamiliar } from './entities/miembro-familiar.entity';
import { PlanIntervencion } from './entities/plan-intervencion.entity';
import { FactorRiesgo } from './entities/factor-riesgo.entity';
import { FactorProtector } from './entities/factor-protector.entity';
import { FichaControl } from './entities/ficha-control.entity';
import { HistorialResultado } from './entities/historial-resultado.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get('DB_USER'),
        password: cfg.get('DB_PASS'),
        database: cfg.get('DB_NAME'),
        schema: cfg.get('DB_SCHEMA'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Paciente,
      ProgramaControl,
      Familia,
      TipoRelacion,
      MiembroFamiliar,
      PlanIntervencion,
      FactorRiesgo,
      FactorProtector,
      FichaControl,
      HistorialResultado,
    ]),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
