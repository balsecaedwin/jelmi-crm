/**
 * built-in and third party dependencies
 */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

/**
 * services
 */
import { UsersService } from '../../users/services/users.service';

/**
 * interfaces
 */
import { TemplateParameters } from '../helpers/interfaces/template-paramenters.interface';

/**
 * others
 */
import config from '../../../config';

@Injectable()
export class WhatsAppCloudService {
  private graphUrl: string;
  private apiVersion: string;
  private phoneNumberId: string;
  private accessToken: string;

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {
    const { graphUrl, apiVersion, phoneNumberId, accessToken } =
      this.configService.whatsapp;

    this.graphUrl = graphUrl;
    this.apiVersion = apiVersion;
    this.phoneNumberId = phoneNumberId;
    this.accessToken = accessToken;
  }

  async sendBroadcastOffer(message: string): Promise<void> {
    const users = await this.usersService.findAll();

    for (const user of users) {
      const parameters: TemplateParameters = {
        body: [
          {
            type: 'text',
            text: user.firstName,
          },
          {
            type: 'text',
            text: message,
          },
        ],
      };

      await this.sendMessageTemplate(user.phone, 'broadcast_offer', parameters);
    }
  }

  async sendMessageTemplate(
    phone: number,
    template: string,
    parameters?: TemplateParameters,
  ): Promise<void> {
    const payload = {
      messaging_product: 'whatsapp',
      to: phone,
      type: 'template',
      template: {
        name: template,
        language: {
          code: 'es_MX',
        },
        components: parameters
          ? [
              {
                type: 'body',
                parameters: parameters.body,
              },
            ]
          : undefined,
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.graphUrl}/${this.apiVersion}/${this.phoneNumberId}/messages`,
          JSON.stringify(payload),
          {
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        ),
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
