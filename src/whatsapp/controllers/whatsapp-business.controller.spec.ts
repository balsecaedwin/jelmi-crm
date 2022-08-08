/**
 * built-in and third party dependencies
 */
import { Test, TestingModule } from '@nestjs/testing';

/**
 * controllers
 */
import { WhatsAppBusinessController } from './whatsapp-business.controller';

describe('WhatsAppBusinessController', () => {
  let controller: WhatsAppBusinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatsAppBusinessController],
    }).compile();

    controller = module.get<WhatsAppBusinessController>(
      WhatsAppBusinessController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
