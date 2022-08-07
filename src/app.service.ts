/**
 * built-in and third party dependencies
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): Record<string, string> {
    return {
      message: 'Welcome to Jelmi!',
    };
  }
}
