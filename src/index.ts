import express, { Application, Request, Response, NextFunction } from 'express';
import { router } from './routes/routes';
const app: Application = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
})
