import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import getAppConfig from '../config';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import routesUsers from './routes/users';
import routesCards from './routes/cards';
import routesAuth from './routes/auth';

const { port, db } = getAppConfig();
const app = express();

mongoose.connect(db);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/', routesAuth);

app.use(auth);
app.use('/', routesUsers);
app.use('/', routesCards);

app.use(errorLogger);
// errors handler

app.listen(port);

console.log(`\nServer is running on ${port}; \ndb - "${db}". \n`);
