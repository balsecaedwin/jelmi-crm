/**
 * built-in and third party dependencies
 */
import { Test, TestingModule } from '@nestjs/testing';

/**
 * services
 */
import { WhatsAppCloudService } from './whatsapp-cloud.service';

describe('WhatsAppCloudService', () => {
  let provider: WhatsAppCloudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatsAppCloudService],
    }).compile();

    provider = module.get<WhatsAppCloudService>(WhatsAppCloudService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
