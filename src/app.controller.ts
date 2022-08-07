/**
 * built-in and third party dependencies
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * services
 */
import { AppService } from './app.service';

/**
 * interfaces
 */
import { HealthCheckResponseDto } from './common/dtos/responses/health-check-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('App')
  @ApiOperation({ summary: 'Health Check' })
  @ApiOkResponse({ status: 200, type: HealthCheckResponseDto })
  getStatus(): Record<string, string> {
    return this.appService.getStatus();
  }
}
