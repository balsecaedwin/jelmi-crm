/**
 * built-in and third party dependencies
 */
import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty()
  readonly message: string;
}
