/**
 * built-in and third party dependencies
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

/**
 * modules
 */
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

/**
 * controllers
 */
import { AppController } from './app.controller';

/**
 * services
 */
import { AppService } from './app.service';

/**
 * others
 */
import config from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
