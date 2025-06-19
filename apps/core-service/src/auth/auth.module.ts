import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule as SharedAuth } from '@app/auth';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../services/usuario.service';

@Module({
  imports: [ConfigModule, SharedAuth, TypeOrmModule.forFeature([Usuario])],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService],
  exports: [],
})
export class AuthModule {}
