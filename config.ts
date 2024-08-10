// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';

interface IAppConfig {
  port: number,
  db: string
}

const DEFAULT_PORT = 3000;
const DEFAULT_DB = 'mongodb://localhost:27017/mestodb';

const getAppConfig = (): IAppConfig => ({
  port: Number(process.env?.PORT) ?? DEFAULT_PORT,
  db: process.env?.DB ?? DEFAULT_DB,
});

export default getAppConfig;
