import express from 'express'
import connectDb from './config/db.js'

const PORT = process.env.PORT || 3001;

const app = express();

connectDb();

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
