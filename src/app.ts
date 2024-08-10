import express from 'express';
import mongoose from 'mongoose';
import config from '../config';
import fakeAuth from './middlewares/auth';
import routesUsers from './routes/users';
import routesCards from './routes/cards';

const { port, db } = config();
const app = express();

mongoose.connect(db);

app.use(express.json());
app.use(fakeAuth);
app.use('/', routesUsers);
app.use('/', routesCards);

app.listen(port);
