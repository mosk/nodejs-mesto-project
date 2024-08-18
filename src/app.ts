import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { errors } from 'celebrate';
import { ErrorNotFound } from './errors';
import { MESSAGE } from './consts';
import getAppConfig from '../config';
import {
  auth, requestLogger, errorLogger, errorHandler,
} from './middlewares';

import routesUsers from './routes/users';
import routesCards from './routes/cards';
import routesAuth from './routes/auth';

const { port, db } = getAppConfig();
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect(db);

app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use('/', routesAuth);

app.use(auth);
app.use('/', routesUsers);
app.use('/', routesCards);

app.use('*', (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new ErrorNotFound(MESSAGE.NOT_FOUND));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(port);
