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
    whatsapp: {
      graphUrl: process.env.GRAPH_URL,
      apiVersion: process.env.API_VERSION,
      phoneNumberId: process.env.PHONE_NUMBER_ID,
      accessToken: process.env.ACCESS_TOKEN,
    },
  };
});
