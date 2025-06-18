import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cfg.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [PassportModule, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
