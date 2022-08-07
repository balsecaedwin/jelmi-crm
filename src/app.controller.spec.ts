/**
 * built-in and third party dependencies
 */
import { Test, TestingModule } from '@nestjs/testing';

/**
 * controllers
 */
import { AppController } from './app.controller';

/**
 * services
 */
import { AppService } from './app.service';

/**
 * responses
 */
const getStatusRespose = { message: 'Welcome to Jelmi!' };

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Health Check', () => {
    it('should return "Welcome to Jelmi!" message', () => {
      expect(appController.getStatus()).toStrictEqual(getStatusRespose);
    });
  });
});
