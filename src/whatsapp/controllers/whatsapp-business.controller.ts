/**
 * built-in and third party dependencies
 */
import { BadRequestException, Controller, Get, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * services
 */
import { WhatsAppCloudService } from '../services/whatsapp-cloud.service';

@ApiTags('WhatsApp Business')
@Controller('whatsapp-business')
export class WhatsAppBusinessController {
  constructor(private readonly whatsAppCloudService: WhatsAppCloudService) {}

  @Get('webhooks')
  @ApiOperation({ summary: 'Validate webhook connection' })
  webhooks(@Request() req: any): Promise<any> {
    console.log('Request payload:', req);

    if (
      req.query['hub.mode'] == 'subscribe' &&
      req.query['hub.verify_token'] == process.env.WEBHOOK_TOKEN
    ) {
      return req.query['hub.challenge'];
    } else {
      throw new BadRequestException();
    }
  }
}
