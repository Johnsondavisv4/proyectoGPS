import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CentroSalud } from './entities/centro-salud.entity';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';
import { UsuarioRol } from './entities/usuario-rol.entity';

import { CentroSaludService } from './services/centro-salud.service';
import { UsuarioService } from './services/usuario.service';
import { RolService } from './services/rol.service';
import { UsuarioRolService } from './services/usuario-rol.service';

import { CentroSaludController } from './controllers/centro-salud.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { RolController } from './controllers/rol.controller';
import { UsuarioRolController } from './controllers/usuario-rol.controller';

import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

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
    TypeOrmModule.forFeature([CentroSalud, Usuario, Rol, UsuarioRol]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cfg.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [
    CentroSaludController,
    UsuarioController,
    RolController,
    UsuarioRolController,
    AuthController,
  ],
  providers: [
    CentroSaludService,
    UsuarioService,
    RolService,
    UsuarioRolService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
