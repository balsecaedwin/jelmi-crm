/**
 * built-in and third party dependencies
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

/**
 * enums
 */
import { Genders } from '../helpers/enums/genders.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly phone: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly birthdate: string;

  @ApiProperty()
  @IsString()
  @IsEnum(Genders)
  @IsNotEmpty()
  readonly gender: string;
}
