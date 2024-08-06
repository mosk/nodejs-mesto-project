import express from 'express';
// import mongoose from 'mongoose';
const PORT = 3000;
const DB_MESTO = 'mongodb://localhost:27017/mestodb'

const app = express();

// mongoose.connect(DB_MESTO);

app.listen(PORT);