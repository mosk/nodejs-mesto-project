import express from 'express';
import mongoose from 'mongoose';
import routesUsers from './routes/users';
// import routesCards from './routes/cards';
const PORT = 3000;
const DB_MESTO = 'mongodb://localhost:27017/mestodb';

const app = express();

mongoose.connect(DB_MESTO);

app.use(express.json()); // для собирания JSON-формата
app.use('/', routesUsers);
// app.use('/', routesCards);

app.listen(PORT);
