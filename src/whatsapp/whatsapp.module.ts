/**
 * built-in and third party dependencies
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

/**
 * modules
 */
import { UsersModule } from '../users/users.module';

/**
 * controllers
 */
import { WhatsAppBusinessController } from './controllers/whatsapp-business.controller';

/**
 * services
 */
import { WhatsAppCloudService } from './services/whatsapp-cloud.service';

/**
 * others
 */
import config from '../../config';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [WhatsAppBusinessController],
  providers: [
    {
      provide: 'config',
      useValue: config,
    },
    WhatsAppCloudService,
  ],
})
export class WhatsAppModule {}
