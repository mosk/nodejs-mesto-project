import 'dotenv/config';

interface IAppConfig {
  port: number,
  db: string
  secretKey: string
}

const DEFAULT_PORT = 3000;
const DEFAULT_DB = 'mongodb://localhost:27017/mestodb';
const DEFAULT_SECRET_KEY = 'IDDQD';

const getAppConfig = (): IAppConfig => ({
  port: Number(process.env?.PORT) ?? DEFAULT_PORT,
  db: process.env?.DB ?? DEFAULT_DB,
  secretKey: process.env?.DB ?? DEFAULT_SECRET_KEY,
});

export default getAppConfig;
