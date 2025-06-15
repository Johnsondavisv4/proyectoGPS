import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsInt()
  id_centro_salud: number;
}
