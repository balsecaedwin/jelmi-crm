import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      connection: process.env.MONGO_CONNECTION,
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
      host: process.env.MONGO_HOST,
      dbName: process.env.MONGO_DB,
    },
  };
});
