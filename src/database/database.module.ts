/**
 * built-in and third party dependencies
 */
import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * others
 */
import config from '../../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, pass, host, dbName } = configService.mongo;

        return {
          uri: `${connection}://${host}`,
          user,
          pass,
          dbName,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
