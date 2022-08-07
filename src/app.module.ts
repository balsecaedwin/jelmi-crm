/**
 * built-in and third party dependencies
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/**
 * controllers
 */
import { AppController } from './app.controller';

/**
 * services
 */
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
