import express, { Application, Request, Response, NextFunction } from 'express';
import { router } from './routes/routes';
const app: Application = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
})

app.listen(5000, () => {
  console.log("Running in port 5000");
})
