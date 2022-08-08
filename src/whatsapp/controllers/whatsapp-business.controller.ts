/**
 * built-in and third party dependencies
 */
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Request,
} from '@nestjs/common';
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

  @Post('webhooks')
  @ApiOperation({ summary: 'Recives messages from users' })
  async messages(@Request() req: any): Promise<void> {
    const entry: any[] = req.body.entry;

    if (!entry?.length) {
      throw new BadRequestException();
    }

    const changes = entry[0].changes;

    for (const change of changes) {
      if (change.field === 'messages') {
        const messages = change.value.messages;

        if (messages?.length) {
          for (const message of messages) {
            console.log('New message from webhook:', message);

            await this.whatsAppCloudService.sendBroadcastOffer(
              message.text.body,
              +message.from,
            );
          }
        }
      }
    }
  }
}
